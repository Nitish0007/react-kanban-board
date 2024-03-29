import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Clipboard } from "react-feather";

import "./Popup.css";

export default function FormDialog(props) {
  const [value, setValue] = React.useState("");

  return (
    <div>
      <Dialog
        open={props.openBool}
        onClose={() => props.openBool}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <h3 className="board-header">Add Board</h3>
          <div className="board-header_item">
            <Clipboard />
            <label className="board-header_title">Board Title</label>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Board Title"
            type="Cardtitle"
            fullWidth
            defaultValue={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setValue("");
              props.handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!value) return;
              props.addCard(value);
              setValue("");
              props.handleClose();
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
