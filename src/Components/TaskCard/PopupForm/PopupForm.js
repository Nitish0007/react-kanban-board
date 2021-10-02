import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Type, Tag, AlignLeft } from "react-feather";
import { Chip } from "@material-ui/core";

import "./Popup.css";

const FormDialog = (props) => {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <h2 className="popup-title">Card Info</h2>
          <div className="item-header">
            <Type size={20} />
            <label className="item-header_label">Card Title</label>
          </div>
          <p className="card-title">{props.info?.taskTitle}</p>
          <div className="item-header">
            <Tag size={20} />
            <label className="item-header_label">Labels</label>
          </div>
          <div className="popup_labels">
            {props.info?.labelArray?.map((label) => (
              <Chip
                label={label.text}
                size="small"
                style={{ backgroundColor: `${label.color}` }}
              />
            ))}
          </div>
          <div className="item-header">
            <AlignLeft size={20} />
            <label className="item-header_label">Description</label>
          </div>
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
              color: "#000",
              boxShadow: "0 0 8px 0 #ccc",
            }}
            defaultValue={props.info?.desc}
          />
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
