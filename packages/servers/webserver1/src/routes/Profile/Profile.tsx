import React, { FC, useCallback, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import { useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import { useQuery } from "react-query";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
// import api from "../../api/users/api";
import ConfirmDialog from "../../components/ConfirmDialog";
import RenderInput from "../../components/RenderInput";
// import RenderInput from "@puzzle-mussia/form-input";
// import * as Yup from "yup";
// import useUsers from "../../hooks/users";
import { IUser } from "../../types";

interface AddUserModalProps {
    // add?: any;
    toggleOpen: () => void; //  React.FormEvent<HTMLInputElement>
}

// const SignupSchema = Yup.object().shape({
//     // name: Yup.boolean()
//     name: Yup.string().required(),
//     // password: yup.string().required(),
//     // remember: yup.boolean(),
//     // // age: yup.number().required().positive().integer(),
//     // email: yup.string().email().required(),
//     // website: yup.string().url(),
//     // createdOn: yup.date().default(() => new Date()),
// });

interface Values extends IUser {
    // email: string;
    // name: string;
    password: string;
    select: string;
    remember: boolean;
}

const AddUserForm: React.FC<AddUserModalProps> = (props) => {
    console.log("props", props);
    // const history = useHistory();

    // const { post } = useUsers();
    const sub = useCallback((values: Values) => {
        console.log("values", values);
        // post(values).then(() => {
        //     history.push("/");
        // });
    }, []);

    // const options = [
    //     {
    //         _id: "aris",
    //         name: "aris",
    //     },
    //     {
    //         _id: "are",
    //         name: "are",
    //     },
    // ];

    return (
        <Formik
            // validationSchema={SignupSchema}
            // validate={(values: Values) => {
            // values.
            // const errors = {};
            // if (!values.email) {
            // }
            // }}
            initialValues={{ email: "", name: "", password: "", remember: false, select: "are" } as Values}
            onSubmit={sub}
        >
            {(form) => {
                console.log("form", form);
                return (
                    <Form>
                        <Typography variant="body1">Add new user</Typography>
                        {}

                        <Grid>
                            <RenderInput label="Email" type="email" name="email" />
                        </Grid>
                        <Grid>
                            <RenderInput label="Password" type="password" name="password" />
                        </Grid>
                        <Grid>
                            <RenderInput label="Name" name="name" />
                        </Grid>
                        <Grid>
                            <RenderInput label="Remember me" type="checkbox" name="remember" />
                        </Grid>
                        <Grid>
                            {/*<Button onClick={toggleOpen}>Cancel</Button>*/}
                            <Button type="submit">Create</Button>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Profile: FC<Props> = (props) => {
    console.log("props profile", props);
    // const params = useParams();
    // const history = useHistory();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const { id } = params;
    // const user = useQuery(["user", id], api.getById);
    // const { remove } = useUsers();

    const [isNewOpen, setIsNewOpen] = useState(false);
    const toggleIsNewOpen = useCallback(() => {
        setIsNewOpen(!isNewOpen);
    }, [isNewOpen]);
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = useCallback(() => {
        setIsEdit(!isEdit);
    }, [isEdit]);

    // const handleDelete =s
    const handleSubmit = useCallback((item) => {
        console.log({ item });
        // remove(item._id).then(() => {
        //     console.log("deleted id", id);
        //     history.push("/");
        // });
    }, []);

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const toggleConfirmModal = useCallback(() => {
        setOpenConfirmModal(!openConfirmModal);
    }, [openConfirmModal]);

    // if (!user.data) {
    //     return <div>no user</div>;
    // }

    // console.log("user", user);
    // console.log("------> users", users);

    return (
        <div>
            <div>
                <TextField />
                {/*<h2>name: {user.data.name}</h2>*/}
                {/*<h2>name: {user.data._id}</h2>*/}
                <Button color="primary" onClick={toggleConfirmModal}>
                    Delete
                </Button>
                <Button color="secondary" onClick={toggleIsEdit}>
                    Edit
                </Button>
                <Button color="secondary" onClick={toggleIsNewOpen}>
                    Add
                </Button>
            </div>
            <ConfirmDialog
                // title="Delete User"
                // text={`Will delete user ${user.data.name}`}
                open={openConfirmModal}
                // selected={user.data}
                selected={{ _id: "sd" }}
                handleClose={toggleConfirmModal}
                // handleConfirm={handleDelete}
                handleConfirm={handleSubmit}
            />
            <ThemeProvider
                theme={createMuiTheme({
                    palette: {
                        primary: {
                            main: "#25F600",
                        },
                    },
                })}
            >
                <Dialog open={isNewOpen} onClose={toggleIsNewOpen}>
                    <AddUserForm toggleOpen={toggleIsNewOpen} />
                </Dialog>
                <Dialog
                    open={isEdit}
                    onClose={toggleIsEdit}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Formik initialValues={{}} onSubmit={handleSubmit}>
                        {() => {
                            <Form>
                                <DialogTitle color="primary" id="alert-dialog-title">
                                    Edid
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">name ?</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={toggleIsEdit} color="primary">
                                        {/*{buttonCancelTitle}*/}
                                        Cancel
                                    </Button>
                                    <Button
                                        // onClick={confirm}
                                        data-testid="confirm-button"
                                        color="primary"
                                        autoFocus
                                    >
                                        {/*{buttonConfirmTitle}*/}
                                        titkesdasd
                                    </Button>
                                </DialogActions>
                            </Form>;
                        }}
                    </Formik>
                </Dialog>
            </ThemeProvider>
        </div>
    );
};

export default Profile;
