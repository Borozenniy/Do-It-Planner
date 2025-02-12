const mongoose = require('mongoose');

const subgoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  phase: {
    type: String,
    enum: ['to do', 'in progress', 'done'],
    default: 'to do',
  },
  priority: {
    type: String,
    enum: ['no priority', 'low', 'medium', 'high'],
    default: 'no priority',
  },
  id: { type: Number, required: true, unique: true },
});

const subgoalsSchema = new mongoose.Schema({
  subgoals: [subgoalSchema],
});

module.exports = mongoose.model('Subgoal', subgoalSchema);
module.exports = mongoose.model('Subgoals', subgoalsSchema);
