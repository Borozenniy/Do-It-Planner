import { db } from '../database';
import { users, subgoals, goals } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const User = require('../schemas/user'); // Модель користувача

const getTasks = async (req, res) => {
  const id = req.params.id;
  const { sub } = req.auth.payload;

  try {
    const [user] = await db.select().from(users).where(eq(users.auth0Id, sub));

    if (!user) {
      console.log('User not found');
      return res
        .status(404)
        .json({ message: 'User not found', status: 'failed' });
    }

    const tasks = await db
      .select()
      .from(subgoals)
      .where(eq(subgoals.goalId, id));

    res.status(200).json({ tasks, status: 'success' });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      status: 'failed',
      error: error.message,
    });
  }
};

const getTask = async (req, res) => {
  const { sub } = req.auth.payload;

  try {
    const [user] = await db.select().from(users).where(eq(users.auth0Id, sub));

    if (!user) {
      console.log('User not found');
      return res
        .status(404)
        .json({ message: 'User not found', status: 'failed' });
    }
  } catch (error) {}
};

const addSubgoal = async (req, res) => {
  const id = req.params.id;
  const { mode, taskData } = req.body;
  const { sub } = req.auth.payload;

  try {
    //const user = await User.findOne({ email });
    //const user = await db.select(users).where(eq(users.id, id));
    const user = await db.select().from(users).where(eq(users.auth0Id, sub));
    if (!user) {
      console.log('User not found');
      return res
        .status(404)
        .json({ message: 'User not found', status: 'failed' });
    }

    //const goal = await db.select(goals).where(eq(goals.id, goalId));
    const goal = await db.select().from(goals).where(eq(goals.id, id));

    //const goal = user.goals.find((goal) => goal.id === goalId);
    if (!goal) {
      console.log('Goal not found');
      return res
        .status(404)
        .json({ message: 'Goal not found', status: 'failed' });
    }

    //console.log(goal);
    const [newTask] = await db
      .insert(subgoals)
      .values({
        goalId: id,
        title: taskData.title,
        priority: taskData.priority,
        phase: taskData.phase,
      })
      .returning();

    await db
      .update(goals)
      .set({ mode: mode || 'none' })
      .where(eq(goals.id, id));

    res.status(201).json({
      newTask,
      message: 'Subgoal added to goal',
      goal,
      status: 'success',
    });
    console.log('Subgoal added to goal');
  } catch (error) {
    console.error('Error adding subgoal:', error);
    res.status(500).json({
      message: 'Server error',
      status: 'failed',
      error: error.message,
    });
  }
};

const changeSubgoalPhase = async (req, res) => {
  const { sub } = req.auth.payload;
  const goalId = req.params.id;
  const { id, phase } = req.body;
  //const { id, goalId, subgoalId, phase } = req.body;
  console.log(req.body);

  console.log('id' + req.params.id);
  console.log('sub' + sub);

  try {
    const user = await db.select().from(users).where(eq(users.auth0Id, sub));
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', status: 'error' }); // Повертаємо помилку і завершуємо виконання
    }

    const goal = await db.select().from(goals).where(eq(goals.id, goalId));
    if (!goal) {
      return res
        .status(404)
        .json({ message: 'Goal not found', status: 'error' });
    }

    const subgoal = await db.select().from(subgoals).where(eq(subgoals.id, id));
    if (!subgoal) {
      return res
        .status(404)
        .json({ message: 'Task not found', status: 'error' });
    }

    await db.update(subgoals).set({ phase: phase }).where(eq(subgoals.id, id));

    res
      .status(201)
      .json({ message: 'Task phase changed', subgoal, status: 'success' });
  } catch (error) {
    console.error('Error changing subgoal phase:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const changeSubgoalPriority = async (req, res) => {
  const { sub } = req.auth.payload;
  const { id, priority } = req.body;
  const goalId = req.params.id;
  //const { id, goalId, subgoalId, priority } = req.body;
  try {
    const user = await db.select(users).where(eq(users.id, id));
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', status: 'error' });
    }

    const goal = await db.select(goals).where(eq(goals.id, goalId));
    if (!goal) {
      return res
        .status(404)
        .json({ message: 'Goal not found', status: 'error' });
    }

    const subgoal = await db.select(subgoals).where(eq(subgoals.id, subgoalId));
    if (!subgoal) {
      return res
        .status(404)
        .json({ message: 'Subgoal not found', status: 'error' });
    }

    await db
      .update(subgoals)
      .set({ priority })
      .where(eq(subgoals.id, subgoalId));
    await user.save();

    return res
      .status(200)
      .json({ message: 'Subgoal priority changed', status: 'success' });
  } catch (error) {
    console.log('Error changind priority', error);
    res.status(500).json({ message: 'Internal Server Error', status: 'error' });
  }
};

const deleteSubgoal = async (req, res) => {
  const { taskId } = req.body;
  const id = req.params.id;
  const { sub } = req.auth.payload;

  try {
    const user = await db.select().from(users).where(eq(users.auth0Id, sub));
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', status: 'error' });
    }
    const goal = await db.select().from(goals).where(eq(goals.id, id));
    if (goal.length === 0) {
      return res
        .status(404)
        .json({ message: 'Goal not found', status: 'error' });
    }

    const subgoal = await db
      .select()
      .from(subgoals)
      .where(eq(subgoals.id, taskId));
    if (subgoal.length === 0) {
      return res
        .status(404)
        .json({ message: 'Subgoal not found', status: 'error' });
    }

    console.log(subgoal);

    await db.delete(subgoals).where(eq(subgoals.id, taskId));

    return res
      .status(200)
      .json({ message: 'Subgoal deleted successfully', status: 'success' });
  } catch (error) {
    console.error('Error deleting subgoal:', error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', status: 'error' });
  }
};

export {
  changeSubgoalPhase,
  deleteSubgoal,
  changeSubgoalPriority,
  addSubgoal,
  getTasks,
  getTask,
};

//module.exports = {
//  changeSubgoalPhase,
//  deleteSubgoal,
//  changeSubgoalPriority,
//  addSubgoal,
//};

//import { db } from '../database';
//import { users, subgoals, goals } from '../db/schema';
//import { eq } from 'drizzle-orm';

//const User = require('../schemas/user'); // Модель користувача

//const addSubgoal = async (req, res) => {
//  const { id, goalId, mode, subgoalData } = req.body;
//  //console.log(req.body);
//  //if (!email) {
//  //  return res.status(400).json({ message: 'Email is required' });
//  //}

//  try {
//    //const user = await User.findOne({ email });
//    const user = await db.select(users).where(eq(users.id, id));
//    if (!user) {
//      console.log('User not found');
//      return res
//        .status(404)
//        .json({ message: 'User not found', status: 'failed' });
//    }

//    const goal = await db.select(goals).where(eq(goals.id, goalId));

//    //const goal = user.goals.find((goal) => goal.id === goalId);
//    if (!goal) {
//      console.log('Goal not found');
//      return res
//        .status(404)
//        .json({ message: 'Goal not found', status: 'failed' });
//    }

//    //console.log(goal);
//    const [newSubGoal] = await db
//      .insert('subgoal')
//      .values(subgoalData)
//      .returning();

//      await db.update(goals).set({mode: mode || 'none'}).where(eq(goals.id), goalId);

//    //goal.mode = mode || 'none';

//    //goal.subgoals.push(subgoalData);
//    //user.markModified('goals');
//    //await user.save();
//    //console.log(user.goals[0].subgoals);
//    res
//      .status(201)
//      .json({ message: 'Subgoal added to goal', goal, status: 'success' });
//    console.log('Subgoal added to goal');
//  } catch (error) {
//    console.error('Error adding subgoal:', error);
//    res.status(500).json({
//      message: 'Server error',
//      status: 'failed',
//      error: error.message,
//    });
//  }
//};

//const changeSubgoalPhase = async (req, res) => {
//  console.log('try to change subgoal phase');
//  const { email, goalId, subgoalId, phase } = req.body;

//  try {
//    const user = await User.findOne({ email });
//    if (!user) {
//      return res
//        .status(404)
//        .json({ message: 'User not found', status: 'error' }); // Повертаємо помилку і завершуємо виконання
//    }

//    const goal = user.goals.find((goal) => goal.id === goalId);
//    if (!goal) {
//      return res
//        .status(404)
//        .json({ message: 'Goal not found', status: 'error' });
//    }

//    const subgoal = goal.subgoals.find((subgoal) => subgoal.id === subgoalId);
//    if (!subgoal) {
//      return res
//        .status(404)
//        .json({ message: 'Subgoal not found', status: 'error' });
//    }

//    subgoal.phase = phase;
//    await user.save();

//    res
//      .status(201)
//      .json({ message: 'Subgoal phase changed', subgoal, status: 'success' });
//    console.log('Subgoal phase changed');
//  } catch (error) {
//    console.error('Error changing subgoal phase:', error);
//    res.status(500).json({ message: 'Server error', error });
//  }
//};

//const changeSubgoalPriority = async (req, res) => {
//  const { email, goalId, subgoalId, priority } = req.body;
//  try {
//    const user = await User.findOne({ email });
//    if (!user) {
//      return res
//        .status(404)
//        .json({ message: 'User not found', status: 'error' });
//    }
//    const goal = user.goals.find((goal) => goal.id === goalId);
//    if (!goal) {
//      return res
//        .status(404)
//        .json({ message: 'Goal not found', status: 'error' });
//    }

//    const subgoal = goal.subgoals.find((subgoal) => subgoal.id === subgoalId);
//    if (!subgoal) {
//      return res
//        .status(404)
//        .json({ message: 'Subgoal not found', status: 'error' });
//    }

//    subgoal.priority = priority;
//    await user.save();

//    return res
//      .status(200)
//      .json({ message: 'Subgoal priority changed', status: 'success' });
//  } catch (error) {
//    console.log('Error changind priority', error);
//    res.status(500).json({ message: 'Internal Server Error', status: 'error' });
//  }
//};

//const deleteSubgoal = async (req, res) => {
//  const { email, goalId, subgoalId } = req.body;
//  try {
//    const user = await User.findOne({ email });
//    if (!user) {
//      return res
//        .status(404)
//        .json({ message: 'User not found', status: 'error' });
//    }
//    const goal = user.goals.find((goal) => goal.id === goalId);
//    if (!goal) {
//      return res
//        .status(404)
//        .json({ message: 'Goal not found', status: 'error' });
//    }

//    const subgoal = goal.subgoals.find((subgoal) => subgoal.id === subgoalId);
//    if (!subgoal) {
//      return res
//        .status(404)
//        .json({ message: 'Subgoal not found', status: 'error' });
//    }

//    goal.subgoals = goal.subgoals.filter((subgoal) => subgoal.id !== subgoalId);
//    await user.save();
//    return res
//      .status(200)
//      .json({ message: 'Subgoal deleted successfully', status: 'success' });
//  } catch (error) {
//    console.error('Error deleting subgoal:', error);
//    return res
//      .status(500)
//      .json({ message: 'Internal Server Error', status: 'error' });
//  }
//};

//module.exports = { changeSubgoalPhase, deleteSubgoal, changeSubgoalPriority };
