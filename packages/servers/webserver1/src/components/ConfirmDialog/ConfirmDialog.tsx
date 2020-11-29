import React, { useCallback } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { IUser } from "../../types";

interface Props {
    buttonConfirmTitle?: string;
    buttonCancelTitle?: string;
    title?: string;
    text?: string;
    open: boolean;
    handleClose: () => void;
    handleConfirm: (item: IUser | { _id: string }) => void;
    selected: IUser | { _id: string };
}

const ConfirmDialog: React.FC<Props> = (props) => {
    const {
        title = "Delete",
        text = "Will delete",
        open = false,
        handleClose,
        handleConfirm,
        selected,
        buttonConfirmTitle = "Submit",
        buttonCancelTitle = "Cancel",
    } = props;
    const confirm = useCallback(() => {
        handleConfirm(selected);
        handleClose();
    }, [selected, handleClose]);

    if (!selected) {
        return null;
    }

    console.log("open", open);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color="primary" id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {buttonCancelTitle}
                </Button>
                <Button onClick={confirm} data-testid="confirm-button" color="primary" autoFocus>
                    {buttonConfirmTitle}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
