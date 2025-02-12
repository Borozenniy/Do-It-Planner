const User = require('../schemas/user'); // Модель користувача

const createGoal = async (req, res) => {
  const { email, goalData } = req.body;
  console.log(email, goalData);

  try {
    // Знайти користувача за email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' }); // Повертаємо помилку і завершуємо виконання
    }

    // Додати нову ціль до масиву goals
    if (!user.goals) {
      user.goals = []; // Ініціалізуємо масив, якщо його немає
    }
    console.log(goalData);
    user.goals.push(goalData);
    await user.save(); // Зберігаємо оновленого користувача

    res.status(201).json({ message: 'Goal added to user', user });
    console.log('Goal added to user');
  } catch (error) {
    console.error('Error adding goal:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteGoal = async (req, res) => {
  const { email, id } = req.body;
  console.log(email, id);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).jsom({ message: 'User not found' });
    }
    user.goals = user.goals.filter((goal) => goal.id !== id);
    await user.save();

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
  const { email } = req.query; // Отримання email з query параметрів

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const user = await User.findOne({ email }); // Пошук користувача за email
  if (user) {
    res.status(200).json(user.goals);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getGoal = async (req, res) => {
  const { email, goalId } = req.params;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const goal = await user.goals.find((goal) => goal._id === goalId);
  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }
  res.status(200).json(goal);
};

const addSubgoal = async (req, res) => {
  const { email, goalId, mode, subgoalData } = req.body;
  //console.log(req.body);
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res
        .status(404)
        .json({ message: 'User not found', status: 'failed' });
    }

    const goal = user.goals.find((goal) => goal.id === goalId);
    if (!goal) {
      console.log('Goal not found');
      return res
        .status(404)
        .json({ message: 'Goal not found', status: 'failed' });
    }
    //console.log(goal);
    if (!goal.subgoals) {
      goal.subgoals = [];
    }

    goal.mode = mode || 'none';

    goal.subgoals.push(subgoalData);
    user.markModified('goals');
    await user.save();
    //console.log(user.goals[0].subgoals);
    res
      .status(201)
      .json({ message: 'Subgoal added to goal', goal, status: 'success' });
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

const changeGoalMode = async (req, res) => {
  const { email, goalId, mode } = req.body;
  try {
    console.log('try 1');
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: 'User not found', status: 'failed' });
    }

    const goal = user.goals.find((goal) => goal.id === goalId);
    if (!goal) {
      console.log('Goal not found');
      return res
        .status(400)
        .json({ message: 'Goal not found', status: 'failed' });
    }
    goal.mode = mode;

    await user.save();
    return res
      .status(200)
      .json({ message: 'Goal mode changed', goal, status: 'success' });
  } catch (error) {
    console.error('Error changung goal mode:', error);
    return res
      .status(500)
      .json({ message: 'Server error', error, status: 'failed' });
  }
};

module.exports = {
  createGoal,
  editGoal,
  getGoals,
  getGoal,
  deleteGoal,
  addSubgoal,
  changeGoalMode,
};
