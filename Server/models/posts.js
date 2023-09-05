const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true
  }
});

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  likes:[likeSchema],
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
  likes: [likeSchema], // Array to store user likes
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creatorName: String,
  created: {
    type: Date,
    default: Date.now
  },
  comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);
