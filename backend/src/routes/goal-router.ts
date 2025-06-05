//const express = require('express');
import express from 'express';
import {
  createGoal,
  editGoal,
  getGoals,
  getGoal,
  deleteGoal,
  changeGoalMode,
} from '../controllers/goal-controller';
import jwtCheck from '../middleware/auth-middleware';

//const {
//  createGoal,
//  editGoal,
//  getGoals,
//  getGoal,
//  deleteGoal,
//  addSubgoal,
//  changeGoalMode,
//} = require('../controllers/goal-controller');

const router = express.Router();

router.post('/goal', jwtCheck, createGoal); //create-goal =>goal ++
//router.post('/add-subgoal', addSubgoal);
router.get('/goals', jwtCheck, getGoals); //get-goals => goals
router.get('/get-goal', getGoal); // get-goal =>goal
router.put('/edit-goal/:id', editGoal); //edit-goal/:id => goal:id
router.delete('/goal/:id', jwtCheck, deleteGoal); //delete-goal/:id => goal:id ++
router.put('/goal/:id/mode', jwtCheck, changeGoalMode); //change-goal-mode => goal:id/mode

//module.exports = router;
export default router;
