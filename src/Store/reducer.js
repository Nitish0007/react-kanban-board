const initialState = {
  draggedItem: {},
  deleteTaskID: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DRAG_START": {
      const myState = { ...state };
      const draggedItem = action.draggeditem;
      myState.draggedItem = draggedItem;
      return myState;
    }
    case "DELETE_TASK_ID": {
      const myState = { ...state };
      const taskID = action.deleteTaskID;
      myState.deleteTaskID = taskID;
      return myState;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
