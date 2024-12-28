import { ADD_TASK, TOGGLE_TASK, REMOVE_TASK } from "./actions";

// Initial State
const initialState = {
  tasks: [],
  totalTasks: 0,
};

// Task Reducer
const taskReducer = (state = initialState, action) => {
  console.log("Reducer invoked. Action type:", action.type);

  switch (action.type) {
    case ADD_TASK:
      console.log("Adding task:", action.payload);
      const addState = {
        ...state,
        tasks: [...state.tasks, action.payload],
        totalTasks: state.totalTasks + 1,
      };
      console.log("State after ADD_TASK:", addState);
      return addState;

    case REMOVE_TASK:
      console.log("Removing task with ID:", action.payload);
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      const removeState = {
        ...state,
        tasks: updatedTasks,
        totalTasks: state.totalTasks - 1,
      };
      console.log("State after REMOVE_TASK:", removeState);
      return removeState;

    case TOGGLE_TASK:
      console.log("Toggling task with ID:", action.payload);
      const toggledTasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      const toggleState = {
        ...state,
        tasks: toggledTasks,
      };
      console.log("State after TOGGLE_TASK:", toggleState);
      return toggleState;

    default:
      console.log("No matching action. Returning current state.");
      return state;
  }
};

export default taskReducer;
