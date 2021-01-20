const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const milestoneSchema = new Schema(
  {
    milestoneTitle: {
      type: String,
      required: true,
      maxlength: 280
    },
    milestoneStatus: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = milestoneSchema;
