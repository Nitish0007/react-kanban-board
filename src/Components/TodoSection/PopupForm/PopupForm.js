import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Type, AlignLeft, Tag } from "react-feather";
import { Chip } from "@material-ui/core";

import "./PopupForm.css";

const FormDialog = (props) => {
  const labelColors = ["#77c593", "#1e847f", "#e52165", "#12a4d9", "#e0a96d"];

  const [taskTitle, setTaskTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState({
    type: "",
    message: "",
  });
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("");
  const [currLabels, setCurrLabels] = useState({ id: "", text: "", color: "" });
  const [labelArray, setLabelArray] = useState([]);

  const addLabels = (e) => {
    e.preventDefault();
    if (labelArray.length === 5) {
      setErrorMsg({
        type: "label",
        message: "Maximum number of labels : 5",
      });
      return;
    }
    const dummyLabels = [...labelArray];
    dummyLabels.push(currLabels);
    setLabelArray(dummyLabels);
    setColor("");
  };

  const deleteLabel = (id) => {
    const labelIndex = labelArray.findIndex((label) => label.id === id);
    if (labelIndex > -1) {
      const dummyLabels = [...labelArray];
      dummyLabels.splice(labelIndex, 1);
      setLabelArray(dummyLabels);
    }
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <h2 className="popup-title">Add Card</h2>
          <div className="item-header">
            <Type size={20} />
            <label className="item-header_label">Card Title</label>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Card Title"
            type="TaskTitle"
            fullWidth
            defaultValue={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          {errorMsg && errorMsg.type === "title" ? (
            <p style={{ fontWeight: "bold", color: "red" }}>
              {errorMsg.message}
            </p>
          ) : (
            ""
          )}
          <div className="item-header">
            <AlignLeft size={20} />
            <label className="item-header_label">Description</label>
          </div>
          <textarea
            placeholder="Description"
            className="desc"
            defaultValue={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="item-header">
            <Tag size={20} />
            <label className="item-header_label">Labels</label>
          </div>
          <div className="item-header_label_chips">
            {labelArray?.map((label) => (
              <Chip
                label={label.text}
                size="small"
                onDelete={() => {
                  deleteLabel(label.id);
                }}
                style={{ backgroundColor: `${label.color}` }}
              />
            ))}
          </div>
          {errorMsg && errorMsg.type === "label" ? (
            <p style={{ fontWeight: "bold", color: "red" }}>
              {errorMsg.message}
            </p>
          ) : (
            ""
          )}
          <form
            onSubmit={(e) => {
              addLabels(e);
            }}
          >
            <div>
              <div className="item-header_colors">
                {labelColors.map((item, i) => (
                  <li
                    className={`item-header_item ${
                      item === color ? "active" : ""
                    }`}
                    key={i}
                    onClick={(e) => {
                      setColor(item);
                    }}
                    style={{ backgroundColor: `${item}` }}
                  ></li>
                ))}
              </div>
              <TextField
                margin="dense"
                id="name"
                placeholder="Add label"
                type="tags"
                fullWidth
                defautValue={currLabels.text}
                onBlur={(e) => {
                  setCurrLabels({
                    id: Date.now() + Math.random() * 34,
                    text: e.target.value,
                    color,
                  });
                  // e.target.value = "";
                }}
              />
              <button type="submit" className="item-header_label_btn">
                Add Label
              </button>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose();
              setDesc("");
              setTaskTitle("");
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (taskTitle === "") {
                setErrorMsg({
                  type: "title",
                  message: "Enter Title of Your Task",
                });
                return;
              }
              props.handleClose();
              setDesc("");
              setTaskTitle("");
              const newTask = {
                parentID: props.parentID + "",
                desc: desc,
                labelArray,
                taskTitle: taskTitle,
              };
              props.addTask(newTask);
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
