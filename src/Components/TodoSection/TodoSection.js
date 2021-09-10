import React, { useEffect, useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";

import TaskCard from "../TaskCard/TaskCard";

import "./TodoSection.css";
import FormDialog from "./PopupForm/PopupForm";

function TodoSection(props) {
  const [targetID, setTargetID] = useState("");
  const [openPopup, setOpenpopup] = useState(false);
  const [currCardTasks, setCurrCardTasks] = useState([]);

  useEffect(() => {
    const currCardTasks = props.tasksCollection.filter(
      (task) => task.parentID == props.id + ""
    );
    setCurrCardTasks(currCardTasks);
  }, [props.tasksCollection]);

  const handleClickOpen = () => {
    setOpenpopup(true);
  };

  const handleClose = () => {
    setOpenpopup(false);
  };
  const dragOver = (e) => {
    e.preventDefault();
    const target = e.currentTarget.dataset.id;
    setTargetID(target);
    props.targetHandler(targetID);
  };
  const ondrop = (e) => {
    e.preventDefault();
    props.updateTask();
  };

  return (
    <div
      className="todosection"
      onDragOver={(e) => {
        dragOver(e);
      }}
      onDrop={(e) => {
        ondrop(e);
      }}
      data-id={props.id}
    >
      <div className="todosection_title">
        <span>{props.cardData.title}</span>
      </div>
      <div className="todosection_tasks">
        {currCardTasks?.map((item, i) => {
          return <TaskCard key={i} info={item} />;
        })}
      </div>
      <div className="todosection_add-icon">
        <DeleteIcon onClick={() => props.deleteCard(props.id)} />
        <AddCircleIcon onClick={handleClickOpen} />
      </div>
      <FormDialog
        isOpen={openPopup}
        handleClose={handleClose}
        parentID={props.id}
        addTask={props.addTask}
      />
    </div>
  );
}

export default TodoSection;
