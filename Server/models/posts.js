const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  comment: {
    type:String,
    required: true
  },
  creator: {
    type:String,
    required:true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const postSchema = mongoose.Schema({
  title: String,
  category: String,
  content: String,
  image: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId, // Change the type to ObjectId
    ref: 'User', // Replace 'User' with the actual model name for your users.
  },
  creatorName: {
    type: String,

  },
  created: {
    type: Date,
    default: Date.now
  },
  comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);
