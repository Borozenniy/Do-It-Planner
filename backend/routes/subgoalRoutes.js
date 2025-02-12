const express = require('express');

const {
  changeSubgoalPhase,
  deleteSubgoal,
  changeSubgoalPriority,
} = require('../controllers/subgoal-controller');

const router = express.Router();

router.post('/change-phase', changeSubgoalPhase);
router.delete('/delete-subgoal', deleteSubgoal);
router.post('/change-priority', changeSubgoalPriority);

module.exports = router;
