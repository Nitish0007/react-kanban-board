import React, { useState } from "react";
import DescriptionIcon from "@material-ui/icons/Description";
import DeleteIcon from "@material-ui/icons/Delete";

import { connect } from "react-redux";

import "./TaskCard.css";
import FormDialog from "./PopupForm/PopupForm";
import { Chip } from "@material-ui/core";

function TaskCard(props) {
  const [openPopup, setOpenPopup] = useState(false);

  const dragStart = (info) => {
    console.log(info.labelArray);
    if (!info) return;
    const dataTransfer = {
      image: info.image,
      desc: info.desc,
      labelArray: info.labelArray,
      parentID: info.parentID + "",
      id: info.id + "",
      taskTitle: info.taskTitle,
      labelArray: info.labelArray,
    };
    props.drag_start(dataTransfer);
    return dataTransfer;
  };

  const handleClickOpen = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <div
      className="taskcard"
      draggable
      onDragStart={(e) => {
        dragStart(props.info);
      }}
    >
      <div className="taskcard_data">
        <div className="taskcard_data_labels">
          {props.info?.labelArray?.map((label) => (
            <Chip
              label={label.text}
              size="small"
              style={{ backgroundColor: `${label.color}` }}
            />
          ))}
        </div>
        <span
          style={{
            height: "fit-content",
            width: "85%",
            fontWeight: "bold",
          }}
          className="taskcard_task"
        >
          {props.info?.taskTitle}
        </span>

        <div className="taskcard_task-info">
          <DescriptionIcon
            fontSize="medium"
            style={{ cursor: "pointer" }}
            onClick={() => handleClickOpen()}
          />
          <DeleteIcon
            fontSize="medium"
            style={{ cursor: "pointer" }}
            onClick={() => props.deleteTask(props.info?.id)}
          />
        </div>
        <FormDialog
          info={props.info}
          isOpen={openPopup}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    drag_start: (dragged_data) =>
      dispatch({
        type: "DRAG_START",
        draggeditem: dragged_data,
      }),
    deleteTask: (id) =>
      dispatch({
        type: "DELETE_TASK_ID",
        deleteTaskID: id,
      }),
  };
};

export default connect(null, mapDispatchToProps)(TaskCard);
