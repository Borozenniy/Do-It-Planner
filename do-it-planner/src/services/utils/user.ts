export const getGoals = async (user) => {
  try {
    const response = await fetch(
      `https://test-vercel-chi-three.vercel.app/goals/get-goals?email=${user?.email}`,
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
    console.error('Помилка:', error.message);
  }
};

export const createGoal = async (goal) => {
  try {
    const response = await fetch(
      'https://test-vercel-chi-three.vercel.app/goals/create-goal',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
        //credentials: 'include',
      }
    );

    const data = await response.json();
    console.log('Goal created:', data);
  } catch (error) {
    console.error('Помилка:', error.message);
  }
};

//export const getGoals = async (user) => {
//  try {
//    const response = await fetch(
//      `http://localhost:3000/goals/get-goals?email=${user?.email}`,
//      {
//        method: 'GET',
//        headers: {
//          'Content-Type': 'application/json',
//        },
//      }
//    );
//    const data = await response.json();
//    console.log('Goals:', data);
//    return data;
//  } catch (error) {
//    console.error('Помилка:', error.message);
//  }
//};

//export const createGoal = async (goal) => {
//  try {
//    const response = await fetch('http://localhost:3000/goals/create-goal', {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify(goal),
//    });

//    const data = await response.json();
//    console.log('Goal created:', data);
//  } catch (error) {
//    console.error('Помилка:', error.message);
//  }
//};
