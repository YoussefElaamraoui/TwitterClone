const mongoose = require('mongoose');

const threadSchema = mongoose.Schema({
  title: {
    type: String,
    required:true,
  },
  originalMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  otherMessages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users',
    required: true
  },
  creatorName:{
  type: String,
    
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Thread', threadSchema);
