const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const milestoneSchema = require('./Milestone');
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
    goalStatus: {
      type: String,
      default: "Planned",
      minlength: 1,
      maxlength: 280
    },
    goalCategory: {
      type: String,
      minlength: 1,
      maxlength: 280
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      default: Date.now,
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
    milestones: [milestoneSchema],
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
