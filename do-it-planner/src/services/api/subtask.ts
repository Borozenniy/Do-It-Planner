//import { BASE_URL } from './http';

//export const createSubtask = async (data: any) => {
//  try {
//    const response = await fetch(`${BASE_URL}/goal/add-subgoal`, {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify(data),
//    });

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

//export const changeSubtaskPhase = async (data: any) => {
//  try {
//    const response = await fetch(`${BASE_URL}/subgoal/change-phase`, {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify(data),
//    });

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

//export const removeSubtask = async (data: any) => {
//  try {
//    const response = await fetch(`${BASE_URL}/subgoal/delete-subgoal`, {
//      method: 'DELETE',
//      headers: {
//        'Content-Type': 'application/json',
//      },
//      body: JSON.stringify(data),
//    });
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

// LOCALHOST

export const createSubtask = async (data: any) => {
  try {
    const response = await fetch('http://localhost:3000/goal/add-subgoal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export const changeSubtaskPhase = async (data: any) => {
  try {
    const response = await fetch('http://localhost:3000/subgoal/change-phase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

export const removeSubtask = async (data: any) => {
  try {
    const response = await fetch(
      'http://localhost:3000/subgoal/delete-subgoal',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
