import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { connect } from "react-redux";

import TodoSection from "../TodoSection/TodoSection";
import FormDialog from "./PopupForm/PopupForm";

import "./MainContainer.css";

function MainContainer(props) {
  const [isOpen, setIsopen] = useState(false);
  const [cards, setCards] = useState(
    JSON.parse(localStorage.getItem("cards")) || []
  );
  const [targetID, setTargetID] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, cards]);

  const newCard = (name) => {
    const dummyCards = [...cards];
    dummyCards.push({
      id: Math.floor(Date.now() + Math.random() * 79) + "",
      title: name,
    });
    setCards(dummyCards);
  };

  if (props.deleteTaskID) {
    const dummytasks = [...tasks];
    const taskIndex = dummytasks.findIndex(
      (task) => task.id == props.deleteTaskID
    );
    if (taskIndex > -1) {
      dummytasks.splice(taskIndex, 1);
      setTasks(dummytasks);
    }
  }

  const handleOpen = () => {
    setIsopen(true);
    return isOpen;
  };

  const handleClose = () => {
    setIsopen(false);
    return isOpen;
  };

  const targetHandler = (targetID) => {
    setTargetID(targetID);
  };

  const updateTask = () => {
    if (!props.draggedItem || !targetID) return;
    if (props.draggedItem.parentID === targetID) return;
    const array = [...tasks];
    const oldTaskIndex = array.findIndex(
      (item) => item.id + "" === props.draggedItem.id + ""
    );
    if (oldTaskIndex > -1) {
      array.splice(oldTaskIndex, 1);
      array.push({
        id: Math.floor(Date.now() + Math.random() * 43) + "",
        desc: props.draggedItem.desc,
        parentID: targetID + "",
        image: props.draggedItem.image,
        taskTitle: props.draggedItem.taskTitle,
        labelArray: props.draggedItem.labelArray,
      });
      setTasks(array);
    }
  };

  const addTask = (task) => {
    const dummytasks = [...tasks];
    dummytasks.push({
      ...task,
      id: Math.floor(Date.now() + Math.random() * 43) + "",
    });
    setTasks(dummytasks);
  };
  const deleteCard = (cardID) => {
    const dummytasks = [...tasks];
    const updatedTask = dummytasks.filter((task) => task.parentID != cardID);
    setTasks(updatedTask);
    const dummyCards = [...cards];
    const cardIndex = dummyCards.findIndex(
      (card) => card.id + "" == cardID + ""
    );
    if (cardIndex > -1) {
      dummyCards.splice(cardIndex, 1);
      setCards(dummyCards);
    }
  };

  return (
    <div className="main-container">
      <div className="main-container_title">
        <h1>Kanban board</h1>
        <AddCircleOutlineIcon
          onClick={handleOpen}
          className="main-container_addIcon"
        />
      </div>
      <div className="main-container_body">
        {cards.length > 0 &&
          cards?.map((card) => (
            <TodoSection
              cardData={card}
              key={card.id}
              id={card.id}
              tasksCollection={tasks}
              updateTask={updateTask}
              targetHandler={targetHandler}
              addTask={addTask}
              deleteCard={deleteCard}
            />
          ))}
      </div>
      <FormDialog
        openBool={isOpen}
        handleClose={handleClose}
        addCard={newCard}
        style={{ display: "none", margin: "auto" }}
      />
    </div>
  );
}

const mapStateToPorps = (state) => {
  return {
    draggedItem: state.draggedItem,
    deleteTaskID: state.deleteTaskID,
  };
};
// const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToPorps, null)(MainContainer);
