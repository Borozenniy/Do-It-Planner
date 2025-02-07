import { BASE_URL } from './http';

export const createUser = async (user: any) => {
  try {
    const response = await fetch(`${BASE_URL}/user/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    //if (!response.ok) {
    //  throw new Error('Помилка створення користувача');
    //}

    const data = await response.json();
    console.log('Користувач створений:', data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export const getGoals = async (user: any) => {
  try {
    const response = await fetch(
      `${BASE_URL}/goal/get-goals?email=${user.email}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        //credentials: 'include',
      }
    );
    const data = await response.json();
    console.log('Goals:', data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export const createGoal = async (goal: unknown) => {
  try {
    const response = await fetch(`${BASE_URL}.app/goal/create-goal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goal),
      //credentials: 'include',
    });

    const data = await response.json();
    console.log('Goal created:', data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export const changeGoalMode = async (goal: any) => {
  try {
    const response = await fetch(`${BASE_URL}/goal/change-goal-mode`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: goal?.email,
        goalId: goal.goalId,
        mode: goal.mode,
      }),
    });
    console.log('Change goal mode response:', response);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

//* LOCALHOST

//export const createUser = async (user: any) => {
//  try {
//    const response = await fetch('http://localhost:3000/user/create-user', {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify(user),
//    });

//    //if (!response.ok) {
//    //  throw new Error('Помилка створення користувача');
//    //}

//    const data = await response.json();
//    console.log('Користувач створений:', data);
//  } catch (error) {
//    if (error instanceof Error) {
//      console.error('Помилка:', error.message);
//    } else {
//      console.error('Unexpected error:', error);
//    }
//  }
//};

//export const getGoals = async (user: any) => {
//  try {
//    const response = await fetch(
//      `http://localhost:3000/goal/get-goals?email=${user.email}`,
//      {
//        method: 'GET',
//        headers: {
//          'Content-Type': 'application/json',
//        },
//        //credentials: 'include',
//      }
//    );
//    const data = await response.json();
//    console.log('Goals:', data);
//    return data;
//  } catch (error) {
//    if (error instanceof Error) {
//      console.error('Помилка:', error.message);
//    } else {
//      console.error('Unexpected error:', error);
//    }
//  }
//};

//export const createGoal = async (goal: unknown) => {
//  try {
//    const response = await fetch('http://localhost:3000/goal/create-goal', {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify(goal),
//      //credentials: 'include',
//    });

//    const data = await response.json();
//    console.log('Goal created:', data);
//  } catch (error) {
//    if (error instanceof Error) {
//      console.error('Помилка:', error.message);
//    } else {
//      console.error('Unexpected error:', error);
//    }
//  }
//};

//export const deleteGoal = async (goal: any) => {
//  try {
//    const response = await fetch('http://localhost:3000/goal/delete-goal', {
//      method: 'DELETE',
//      headers: {
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify({ email: goal?.email, id: goal.id }),
//    });
//    console.log('Delete goal response:', response);
//  } catch (error) {
//    if (error instanceof Error) {
//      console.error('Помилка:', error.message);
//    } else {
//      console.error('Unexpected error:', error);
//    }
//  }
//};

//export const changeGoalMode = async (goal: any) => {
//  try {
//    const response = await fetch(
//      'http://localhost:3000/goal/change-goal-mode',
//      {
//        method: 'PUT',
//        headers: {
//          'Content-Type': 'application/json',
//        },
//        body: JSON.stringify({
//          email: goal?.email,
//          goalId: goal.id,
//          mode: goal.mode,
//        }),
//      }
//    );

//    const result = await response.json();
//    return result;
//  } catch (error) {
//    if (error instanceof Error) {
//      console.error('Помилка:', error.message);
//    } else {
//      console.error('Unexpected error:', error);
//    }
//  }
//};
