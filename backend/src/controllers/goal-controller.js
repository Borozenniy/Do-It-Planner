import { db } from '../database';
import { users, goals } from '../db/schema';
import { eq } from 'drizzle-orm';

//const User = require('../schemas/user');

const createGoal = async (req, res) => {
  const { name, progressbar, highPriority, mode } = req.body; //remove email
  const { sub } = req.auth.payload;

  try {
    //const user = await db.query(
    //  sql`SELECT * FROM users WHERE id = ${id} LIMIT 1`
    //);
    //const user = await db.select(users).where(eq(users.id, id));
    const [user] = await db.select().from(users).where(eq(users.auth0Id, sub));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // додаємо goal в таблицю goals
    const [newGoal] = await db
      .insert(goals)
      .values({
        name: name,
        userId: user.id,
        progressBar: progressbar,
        mode: mode,
        highPriority: highPriority,
      })
      .returning();

    res.status(201).json({ message: 'Goal added to user', goal: newGoal });
    console.log('Goal added to user');
  } catch (error) {
    console.error('Error adding goal:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteGoal = async (req, res) => {
  //const { id, goalId } = req.body;

  const { sub } = req.auth.payload;
  const id = req.params.id;

  try {
    //const user = await db.select(users).where(eq(users.id, id));
    const [user] = await db.select().from(users).where(eq(users.auth0Id, sub));
    if (!user) {
      return res.status(404).jsom({ message: 'User not found' });
    }
    // видаляємо goal
    await db.delete(goals).where(eq(goals.id, id));
    res.status(201).json({ messgae: 'Goal deleted from user', user });
  } catch (error) {
    console.log('Error deleting goal:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const editGoal = async (req, res) => {
  //const goal = await Goal.findById(req.params.id);
  //if (goal) {
  //  goal.name = req.body.name;
  //  goal.progressbar = req.body.progressbar;
  //  await goal.save();
  //  res.status(200).json(goal);
  //} else {
  //  res.status(404).json({ message: 'Goal not found' });
  //}
};

const getGoals = async (req, res) => {
  //const { id } = req.query; // Отримання email з query параметрів
  const { sub } = req.auth.payload;
  try {
    //const user = await db.select(users).where(eq(users.id, id));
    const [user] = await db.select().from(users).where(eq(users.auth0Id, sub));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentGoals = await db
      .select()
      .from(goals)
      .where(eq(goals.userId, user.id));

    res.status(200).json(currentGoals);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
  //if (!email) {
  //  return res.status(400).json({ message: 'Email is required' });
  //}
  //const user = await User.findOne({ email }); // Пошук користувача за email
  //if (user) {
  //  res.status(200).json(user.goals);
  //} else {
  //  res.status(404).json({ message: 'User not found' });
  //}
};

const getGoal = async (req, res) => {
  const { id, goalId } = req.params;

  try {
    //const user = await db.select(users).whre(eq(users.id, id));
    const user = await db.select().from(users).where(eq(users.id, id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //const goals = await db.select(goals).where(eq(goals.userId, id));
    //const goal = await db.select(goals).where(eq(goals.id, goalId));
    const currentGoals = await db
      .select()
      .from(goals)
      .where(eq(goals.userId, id));

    const currentGoal = currentGoals.find((goal) => goal.id === goalId);

    if (!currentGoal) {
      res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json(currentGoal);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
//const goal = await db.select().from(goals).where(eq(goals.id, goalId));

const changeGoalMode = async (req, res) => {
  const id = req.params.id;
  //const { id, goalId, mode } = req.body;
  const { mode } = req.body;
  const { sub } = req.auth.payload;

  console.log(req.body);
  try {
    //const user = await db.select(users).where(eq(users.id, id));
    const [user] = await db.select().from(users).where(eq(users.id, sub));

    if (!user) {
      res.status(404).json({ message: 'User not found', status: 'failed' });
    }

    //const goal = await db.select(goals).where(eq(goals.id, goalId));
    const goal = await db.select().from(goals).where(eq(goals.id, id));

    if (!goal) {
      res.status(404).json({ message: 'Goal not found', status: 'failed' });
    }

    //await db.update(goals).set({ mode }).where(eq(goals.id), goalId);
    await db.update(goals).set({ mode }).where(eq(goals.id, id));
    res.status(200).json({ message: 'Goal mode changed', status: 'success' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal Server Error', status: 'failed' });
  }

  //const addSubgoal = async (req, res) => {
  //  const { id, email, goalId, mode, subgoalData } = req.body;

  //  //console.log(req.body);
  //  //if (!email) {
  //  //  return res.status(400).json({ message: 'Email is required' });
  //  //}

  //  try {

  //    const user = await db.select(users).where(eq(users.id, id));

  //    if(!user){
  //      res.status(404).json({message: 'User not found'});
  //    }

  //    //const user = await User.findOne({ email });
  //    //if (!user) {
  //    //  console.log('User not found');
  //    //  return res
  //    //    .status(404)
  //    //    .json({ message: 'User not found', status: 'failed' });
  //    //}

  //    const goal = user.goals.find((goal) => goal.id === goalId);
  //    if (!goal) {
  //      console.log('Goal not found');
  //      return res
  //        .status(404)
  //        .json({ message: 'Goal not found', status: 'failed' });
  //    }
  //    //console.log(goal);
  //    if (!goal.subgoals) {
  //      goal.subgoals = [];
  //    }

  //    goal.mode = mode || 'none';

  //    goal.subgoals.push(subgoalData);
  //    user.markModified('goals');
  //    await user.save();
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
};

//module.exports = {
//  createGoal,
//  editGoal,
//  getGoals,
//  getGoal,
//  deleteGoal,
//  changeGoalMode,
//  //addSubgoal,
//};
export { createGoal, editGoal, getGoals, getGoal, deleteGoal, changeGoalMode };

//* MONGO

//const User = require('../schemas/user'); // Модель користувача

//const createGoal = async (req, res) => {
//  const { email, goalData } = req.body;
//  console.log(email, goalData);

//  try {
//    // Знайти користувача за email
//    const user = await User.findOne({ email });

//    if (!user) {
//      return res.status(404).json({ message: 'User not found' }); // Повертаємо помилку і завершуємо виконання
//    }

//    // Додати нову ціль до масиву goals
//    if (!user.goals) {
//      user.goals = []; // Ініціалізуємо масив, якщо його немає
//    }
//    console.log(goalData);
//    user.goals.push(goalData);
//    await user.save(); // Зберігаємо оновленого користувача

//    res.status(201).json({ message: 'Goal added to user', user });
//    console.log('Goal added to user');
//  } catch (error) {
//    console.error('Error adding goal:', error);
//    res.status(500).json({ message: 'Server error', error });
//  }
//};

//const deleteGoal = async (req, res) => {
//  const { email, id } = req.body;
//  console.log(email, id);

//  try {
//    const user = await User.findOne({ email });
//    if (!user) {
//      return res.status(404).jsom({ message: 'User not found' });
//    }
//    user.goals = user.goals.filter((goal) => goal.id !== id);
//    await user.save();

//    res.status(201).json({ messgae: 'Goal deleted from user', user });
//  } catch (error) {
//    console.log('Error deleting goal:', error);
//    res.status(500).json({ message: 'Server error', error });
//  }
//};

//const editGoal = async (req, res) => {
//  //const goal = await Goal.findById(req.params.id);
//  //if (goal) {
//  //  goal.name = req.body.name;
//  //  goal.progressbar = req.body.progressbar;
//  //  await goal.save();
//  //  res.status(200).json(goal);
//  //} else {
//  //  res.status(404).json({ message: 'Goal not found' });
//  //}
//};

//const getGoals = async (req, res) => {
//  const { email } = req.query; // Отримання email з query параметрів

//  if (!email) {
//    return res.status(400).json({ message: 'Email is required' });
//  }
//  const user = await User.findOne({ email }); // Пошук користувача за email
//  if (user) {
//    res.status(200).json(user.goals);
//  } else {
//    res.status(404).json({ message: 'User not found' });
//  }
//};

//const getGoal = async (req, res) => {
//  const { email, goalId } = req.params;
//  if (!email) {
//    return res.status(400).json({ message: 'Email is required' });
//  }
//  const user = await User.findOne({ email });
//  if (!user) {
//    return res.status(404).json({ message: 'User not found' });
//  }
//  const goal = await user.goals.find((goal) => goal._id === goalId);
//  if (!goal) {
//    return res.status(404).json({ message: 'Goal not found' });
//  }
//  res.status(200).json(goal);
//};

//const addSubgoal = async (req, res) => {
//  const { email, goalId, mode, subgoalData } = req.body;
//  //console.log(req.body);
//  if (!email) {
//    return res.status(400).json({ message: 'Email is required' });
//  }

//  try {
//    const user = await User.findOne({ email });
//    if (!user) {
//      console.log('User not found');
//      return res
//        .status(404)
//        .json({ message: 'User not found', status: 'failed' });
//    }

//    const goal = user.goals.find((goal) => goal.id === goalId);
//    if (!goal) {
//      console.log('Goal not found');
//      return res
//        .status(404)
//        .json({ message: 'Goal not found', status: 'failed' });
//    }
//    //console.log(goal);
//    if (!goal.subgoals) {
//      goal.subgoals = [];
//    }

//    goal.mode = mode || 'none';

//    goal.subgoals.push(subgoalData);
//    user.markModified('goals');
//    await user.save();
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

//const changeGoalMode = async (req, res) => {
//  const { email, goalId, mode } = req.body;
//  try {
//    console.log('try 1');
//    const user = await User.findOne({ email });
//    if (!user) {
//      return res
//        .status(400)
//        .json({ message: 'User not found', status: 'failed' });
//    }

//    const goal = user.goals.find((goal) => goal.id === goalId);
//    if (!goal) {
//      console.log('Goal not found');
//      return res
//        .status(400)
//        .json({ message: 'Goal not found', status: 'failed' });
//    }
//    goal.mode = mode;

//    await user.save();
//    return res
//      .status(200)
//      .json({ message: 'Goal mode changed', goal, status: 'success' });
//  } catch (error) {
//    console.error('Error changung goal mode:', error);
//    return res
//      .status(500)
//      .json({ message: 'Server error', error, status: 'failed' });
//  }
//};

//module.exports = {
//  createGoal,
//  editGoal,
//  getGoals,
//  getGoal,
//  deleteGoal,
//  addSubgoal,
//  changeGoalMode,
//};
