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

const goalSchema = new mongoose.Schema({
  name: { type: String },
  id: { type: Number, required: true, unique: true },
  highPriority: { type: Boolean, default: false, required: false },
  progressbar: { type: Boolean, default: false, required: false },
  mode: {
    type: String,
    enum: ['none', 'kanban', 'eisenhower'],
    default: 'none',
  },
  subgoals: [subgoalSchema],
});

//const goalsSchema = new mongoose.Schema({
//  goals: [goalSchema],
//});

module.exports = mongoose.model('Goal', goalSchema);
//module.exports = mongoose.model('Goals', goalsSchema);
module.exports = mongoose.model('Subgoal', subgoalSchema);
