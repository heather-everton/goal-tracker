const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const goalSchema = new Schema(
  {
    goalTitle: {
      type: String,
      required: 'You need name your Goal!',
      minlength: 1,
      maxlength: 280
    },
    goalDescriptione: {
        type: String,
        required: 'You need name a goal Description!',
        minlength: 1,
        maxlength: 280
    },
    goalType: {
        type: String,
        required: 'Please select your goal Type!',
        minlength: 1,
        maxlength: 280
    },  
    goalStatus: {
      type: String,
      minlength: 1,
      maxlength: 280
    }, 
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    comments: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

goalSchema.virtual('commentCount').get(function() {
  return this.comment.length;
});

const Goal = model('Goal', goalSchema);

module.exports = Goal;
