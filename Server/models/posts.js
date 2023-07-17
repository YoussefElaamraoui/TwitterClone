const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  comment: {
    type:String,
    required: true
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
  created: {
    type: Date,
    default: Date.now
  },
  comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);
