import express from 'express';
import {
  changeSubgoalPhase,
  deleteSubgoal,
  changeSubgoalPriority,
  addSubgoal,
  getTasks,
} from '../controllers/task-controller';
import jwtCheck from '../middleware/auth-middleware';

//const {
//  changeSubgoalPhase,
//  deleteSubgoal,
//  changeSubgoalPriority,
//} = require('../controllers/subgoal-controller');

const router = express.Router();

router.get('/:id/tasks', jwtCheck, getTasks); //get-tasks => tasks
router.post('/:id/phase', jwtCheck, changeSubgoalPhase); //task:id/phase
router.delete('/:id/task', jwtCheck, deleteSubgoal); // delete-subgoal => task:id
router.post('/change-priority', jwtCheck, changeSubgoalPriority); //task:id/priority
router.post('/:id/task', jwtCheck, addSubgoal); // add-subgoal => task

//module.exports = router;
export default router;
