const User = require('../schemas/user'); // Модель користувача

const changeSubgoalPhase = async (req, res) => {
  console.log('try to change subgoal phase');
  const { email, goalId, subgoalId, phase } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', status: 'error' }); // Повертаємо помилку і завершуємо виконання
    }

    const goal = user.goals.find((goal) => goal.id === goalId);
    if (!goal) {
      return res
        .status(404)
        .json({ message: 'Goal not found', status: 'error' });
    }

    const subgoal = goal.subgoals.find((subgoal) => subgoal.id === subgoalId);
    if (!subgoal) {
      return res
        .status(404)
        .json({ message: 'Subgoal not found', status: 'error' });
    }

    subgoal.phase = phase;
    await user.save();

    res
      .status(201)
      .json({ message: 'Subgoal phase changed', subgoal, status: 'success' });
    console.log('Subgoal phase changed');
  } catch (error) {
    console.error('Error changing subgoal phase:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const changeSubgoalPriority = async (req, res) => {
  const { email, goalId, subgoalId, priority } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', status: 'error' });
    }
    const goal = user.goals.find((goal) => goal.id === goalId);
    if (!goal) {
      return res
        .status(404)
        .json({ message: 'Goal not found', status: 'error' });
    }

    const subgoal = goal.subgoals.find((subgoal) => subgoal.id === subgoalId);
    if (!subgoal) {
      return res
        .status(404)
        .json({ message: 'Subgoal not found', status: 'error' });
    }

    subgoal.priority = priority;
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
  const { email, goalId, subgoalId } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', status: 'error' });
    }
    const goal = user.goals.find((goal) => goal.id === goalId);
    if (!goal) {
      return res
        .status(404)
        .json({ message: 'Goal not found', status: 'error' });
    }

    const subgoal = goal.subgoals.find((subgoal) => subgoal.id === subgoalId);
    if (!subgoal) {
      return res
        .status(404)
        .json({ message: 'Subgoal not found', status: 'error' });
    }

    goal.subgoals = goal.subgoals.filter((subgoal) => subgoal.id !== subgoalId);
    await user.save();
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

module.exports = { changeSubgoalPhase, deleteSubgoal, changeSubgoalPriority };
