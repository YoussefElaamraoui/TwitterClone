const Post = require("../models/posts");
const Thread = require("../models/thread");
const fs = require('fs');

module.exports = class API
{

    //Fetching all posts in the database
    static async fetchAllPost(req, res)
    {
        try
        {
            const posts = await Post.find();
            res.status(200).json(posts);
        }
        catch (err)
        {
            res.status(404).json(
            {
                message: err.message
            })
        }
    }

    //Fetching posts by the creator's id 
    static async fetchPostById(req, res)
    {
        const id = req.params.id; //prendo l'id dall'url 
        try
        {
            const post = await Post.findById(id);
            res.status(200).json(post);
        }
        catch (error)
        {
            res.status(200).json(
            {
                message: error.message
            })
        }
    }



    static async fetchPostByUsername(req, res)
    {
        const id = req.params.id; //prendo l'id dall'url 
        try
        {
            const post = await Post.find(
            {
                creatorName: id
            });
            res.status(200).json(post);
        }
        catch (error)
        {
            res.status(400).json(
            {
                message: error.message
            })
        }
    }

    //Creation of the post 
    static async createPost(req, res)
    {
        const post = req.body;
        const user = req.user;


        // Checking if the user gave some image
        if (req.file)
        {
            const imagename = req.file.originalname;
            post.image = imagename
        }

        try
        {
            const createdPost = await Post.create(post); // Create the post and get the result

            // Extract the ID of the created post
            const postId = createdPost._id;
            res.status(201).json(
            {
                message: 'Il Post è stato creato!',
                postId: postId // Return the post ID in the response
            });
        }
        catch (err)
        {
            res.status(400).json(
            {
                message: err
            });
        }
    }

    static async updatePostLikes(req, res) {
    try {
        const newPost = req.body; // I want the post id, not the thread

        const userCheckLiked = newPost.userLiked;

        // Check if the user already liked the post
        const existingLikeIndex = newPost.oldPost.likes.findIndex(like => like.userId === userCheckLiked);

        const post = await Post.findById(newPost.oldPost._id);

        const userLiked = {
            userId: newPost.userLiked, // Use the userLiked identifier
        };


        // Choose to like and they haven't already liked
        if (existingLikeIndex !== -1) {
            // Remove the userLiked from the likes array
            post.likes.splice(existingLikeIndex, 1);
        } else {
            post.likes.push(userLiked);
        }

        // Save the updated post
        await post.save();

        // Get the length of the post.likes array
        const likesCount = post.likes.length;
        console.log(likesCount);

        res.status(200).json({
            message: 'il Post è stato cambiato!',
            likesCount: likesCount, // Include likes count in the response
            post:post,
        });


    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

    //Updating the post, allowing user to change only the image or even the content 
    static async updatePost(req, res)
    {
        const id = req.params.id;
        let new_image = '';

        //if the file is attached change the image and the content
        if (req.file)
        {
            new_image = req.file.filename;
            try
            {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            }
            catch (error)
            {
                res.status(400).json(
                {
                    message: error.message
                });
            }
        }
        else
        {
            new_image = req.body.old_image;
        }


        const newPost = req.body;
        newPost.image = new_image;

        try
        {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json(
            {
                message: 'il Post è stato cambiato!'
            });
        }
        catch (err)
        {
            res.status(400).json(
            {
                message: err.message
            });
        }
    }

    // Deleting the post 
    static async deletePost(req, res)
    {
        const id = req.params.id;
        try
        {
            const result = await Post.findByIdAndDelete(id);
            if (result.image != '')
            {
                try
                {
                    fs.unlinkSync('./uploads/' + result.image);
                }
                catch (error)
                {
                    (error);
                }
            }
            res.status(200).json(
            {
                message: 'il post è stato eliminato'
            })
        }
        catch (error)
        {

        }
    }


    static async comment(req, res)
    {
        const
        {
            content,
            creatorUsername
        } = req.body;
        const postId = req.params.id; // Retrieve the postId from req.params

        try
        {
            const post = await Post.findById(postId);
            if (!post)
            {
                return res.status(404).json(
                {
                    message: 'Post not found'
                });
            }

            post.comments.push(
            {
                comment: content,
                creator: creatorUsername, // Use the correct key 'creator' to set the creator field
            });

            await post.save();
            res.status(201).json(
            {
                message: 'Il commento è stato aggiunto al post!',
                comments: post.comments,
                length: post.comments.length,
            });
        }
        catch (err)
        {
            res.status(400).json(err);
        }
    }




    static async threadCreation(req, res)
    {
        const dataThread = req.body;




        const post = await Post.findById(dataThread.originalMessage);
        if (!post)
        {
            res.status(400).json(
            {
                message: "non ci sono post con quell'id "
            });
        }

        const newThread = new Thread(
        {
            title: dataThread.title,
            originalMessage: dataThread.originalMessage,
            creator: dataThread.creator,
            creatorName: dataThread.creatorName,

        })

        try
        {
            await newThread.save();
            res.status(201).json(
            {
                message: "thread creato"
            });
        }
        catch (err)
        {
            res.status(400).json(
            {
                message: err
            });
        }
    }


    // Adding posts/messages to the thread
    static async threadAdd(req, res)
    {
        const dataThread = req.body;
        const threadLinked = req.params.id;



        try
        {
            // Find the thread in the database using the threadLinked ID
            const thread = await Thread.findById(threadLinked);

            if (!thread)
            {
                // If the thread does not exist, return an error
                return res.status(404).json(
                {
                    message: "Thread not found"
                });
            }

            // Add the new post's ID to the thread's otherMessages array
            thread.otherMessages.push(dataThread.otherMessages);

            // Save the changes to the thread
            await thread.save();

            res.status(201).json(
            {
                message: "Post collegato al thread con successo."
            });
        }
        catch (error)
        {
            console.error("Error adding post to thread:", error);
            res.status(500).json(
            {
                message: "Internal server error"
            });
        }
    }

    static async threadGetAll(req, res)
    {
        try
        {
            const posts = await Thread.find();
            res.status(200).json(posts);
        }
        catch (err)
        {
            res.status(404).json(
            {
                message: err.message
            })
        }
    }


    //Fetching posts by the creator's id 
    static async fetchThreadById(req, res)
    {
        const id = req.params.id; //prendo l'id dall'url 
        try
        {
            const thread = await Thread.findById(id);
            res.status(200).json(thread);
        }
        catch (error)
        {
            res.status(200).json(
            {
                message: error.message
            })
        }
    }



}