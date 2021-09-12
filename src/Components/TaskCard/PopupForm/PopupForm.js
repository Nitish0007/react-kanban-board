import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const FormDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <h2 style={{ margin: "5px", textAlign: "center" }}>Card Info</h2>
          {/* <img src={props.info?.image} /> */}
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              // flexDirection: "column",
              gap: "15px",
            }}
          >
            <label style={{ fontWeight: "bolder", color: "grey" }}>
              Card Title
            </label>
            <p>{props.info?.taskTitle}</p>
          </div>
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
              defaultValue={props.info.desc}
              readOnly
              style={{
                height: "110px",
                width: "300px",
                resize: "none",
                outline: "none",
                padding: "5px",
                border: "none",
              }}
              defaultValue={props.info?.desc}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose();
            }}
            color="primary"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
