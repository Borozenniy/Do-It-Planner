const express = require('express');

const {
  createGoal,
  editGoal,
  getGoals,
  getGoal,
  deleteGoal,
  addSubgoal,
  changeGoalMode,
} = require('../controllers/goal-controller');

const router = express.Router();

router.post('/create-goal', createGoal);
router.post('/add-subgoal', addSubgoal);
router.get('/get-goals', getGoals);
router.get('/get-goal', getGoal);
router.put('/edit-goal/:id', editGoal);
router.delete('/delete-goal', deleteGoal);
router.put('/change-goal-mode', changeGoalMode);

module.exports = router;
