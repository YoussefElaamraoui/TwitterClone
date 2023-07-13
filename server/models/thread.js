const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
  originalPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Thread', threadSchema);
