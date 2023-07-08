const Post = require("../models/posts");
const fs = require('fs');

module.exports = class API {
    //fetch all posts 
    static async fetchAllPost(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }
    //Prendo i messaggi postati solo con un'id specifico
    static async fetchPostById(req, res) {
        const id = req.params.id; //prendo l'id dall'url 
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (error) {
            res.status(200).json({message:error.message})
        }
    }

    static async createPost(req, res) {
        const post = req.body;
        const imagename = req.file.originalname;
        post.image = imagename;
        try {
            await Post.create(post);
            res.status(201).json({ message: 'il Post è stato creato!' });
        } catch (err) {
            res.status(400).json({ message: 'Ho avuto un errore' });
        }

    }

    static async updatePost(req, res) {
        const id = req.params.id;
        let new_image = '';
        //se voglio aggiornare con il post anche l'immagine
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
        else {
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;

        try {
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({ message: 'il Post è stato cambiato!' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Mi sa che ho degli errori per l'eliminazione della foto nel post, o almeno nella cartella uploads
    static async deletePost(req, res) {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id);
            if (result.image != '') {
                try {
                    fs.unlinkSync('./uploads/' + result.image);
                } catch (error) {
                    console.log(error); 
                }
            }
            res.status(200).json({message:'il post è stato eliminato'})
        } catch (error) {
            
        }
    }
}
