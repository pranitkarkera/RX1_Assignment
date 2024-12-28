// Action Types
export const ADD_TASK = "ADD_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

// Action Creators
export const addTask = (task) => {
    console.log("Dispatching ADD_TASK with payload:", task);
    return {
      type: ADD_TASK,
      payload: task,
    };
};

export const removeTask = (taskId) => {
    console.log("Dispatching REMOVE_TASK with payload:", taskId);
    return{
        type: REMOVE_TASK,
        payload: taskId
    }
};

export const toggleTask = (taskId) => {
    console.log("Dispatching TOGGLE_TASK with payload:", taskId);
    return {
        type: TOGGLE_TASK,
        payload: taskId,
    };
};


