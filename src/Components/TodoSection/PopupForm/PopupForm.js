import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const FormDialog = (props) => {
  // let getFile;
  // const [fileDetected, setFiledetected] = React.useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [desc, setDesc] = useState("");
  // const uploadImage = (files) => {
  //   if (!files) return;
  //   getFile = files;
  //   console.log(getFile);
  //   const formData = new FormData();
  //   formData.append("image", files);
  //   console.log(files);
  //   if (!files) {
  //     setFiledetected(true);
  //   } else {
  //     setFiledetected(false);
  //   }
  // };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <h2 style={{ margin: "5px", textAlign: "center" }}>Add Card</h2>

          {/* <input
            type="file"
            onChange={(e) => {
              e.preventDefault();
              uploadImage(e.target.files);
            }}
            accept=".gif,.jpg,.jpeg,.png,.doc,.docx"
          />
          <button style={{ display: !fileDetected ? "none" : "block" }}>
            Upload
          </button> */}
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <label style={{ fontWeight: "bolder", color: "grey" }}>
              Card Title
            </label>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              placeholder="Task Title"
              type="TaskTitle"
              fullWidth
              defaultValue={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          {errorMsg ? (
            <p style={{ fontWeight: "bold", color: "red" }}>{errorMsg}</p>
          ) : (
            ""
          )}
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <label style={{ fontWeight: "bolder", color: "grey" }}>
              Description
            </label>
            <textarea
              autoFocus
              placeholder="Description"
              style={{
                height: "140px",
                width: "300px",
                resize: "none",
                outline: "none",
                border: "1px solid #eeeee",
              }}
              defaultValue={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose();
              // setFiledetected(false);
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
                setErrorMsg("Enter Title of Your Task");
                return;
              }
              props.handleClose();
              // setFiledetected(false);
              setDesc("");
              setTaskTitle("");
              const newTask = {
                parentID: props.parentID + "",
                // image: getFile,
                desc: desc,
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
