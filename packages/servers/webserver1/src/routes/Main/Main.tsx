import React, { useCallback, useState } from "react";
// import { Button } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import faker from "faker";
// import { useQuery } from "react-query";
// import times from "lodash/times";
// import api from "../../api/users/api";
import { IUser } from "../../types";
import { useHistory } from "react-router-dom";
import useUsers from "../../hooks/users";
// import usersApi from "../../api/users/api";
// import { useToggle } from "../../hooks";
// import { useToggle, useIdle } from "react-use";
import {useToggle, useIdle} from "react-use";
// import useIdle from "react-use/esm/useIdle";

const Main: React.FC = () => {
    const history = useHistory();
    const users = useUsers();
    const [s] = useToggle(false);
    const isIdle = useIdle(3e3);
    console.log("users", users, s, isIdle);
    const [params, setEmail] = useState<Partial<IUser>>({});
    const handleChange = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleEdit = useCallback((e) => {
        history.push(`/profile/${e.target.dataset.id}`);
    }, []);
    const handleDelete = useCallback((e) => {
        users.remove(e.currentTarget.dataset.id);
        // history.push(`/profile/${e.target.dataset.id}`);
    }, []);

    return (
        <div>
            {/*<Button onClick={() => refetch(true, {}, { shit: true })}>refetch</Button>*/}
            <Button onClick={() => users.setCustomQuery({ name: "" })}>set custom query</Button>
            helo from main
            {/*<pre>{JSON.stringify(user.data, null, 2)}</pre>*/}
            <TextField value={params.email} onChange={handleChange} />
            <Button
                color="primary"
                onClick={(e) => {
                    // useQuery(["users", { email }], api.get);
                    // console.log("e", e.target);
                    // // const arr = new Array(10);
                    //
                    // const dat = times(10).map((value) => {
                    //     console.log("value", value);
                    //     return {
                    //         email: faker.internet.email(),
                    //     };
                    // });
                    //
                    // console.log("dat", dat);
                    //
                }}
            >
                Aris button
            </Button>
            <ul>
                {Array.isArray(users.data) &&
                    users.data.map((todo) => (
                        <li data-id={todo._id} key={todo._id}>
                            {/* @ts-ignore */}
                            {todo.email}
                            <Button data-id={todo._id} onClick={handleDelete}>
                                Delete
                            </Button>
                            <Button data-id={todo._id} onClick={handleEdit}>
                                Edit
                            </Button>
                        </li>
                    ))}
            </ul>
            {/*<ul>*/}
            {/*    {users.data !== undefined &&*/}
            {/*        Array.isArray(users.data.ids) &&*/}
            {/*        users.data.ids.map((todo) => (*/}
            {/*            <li data-id={todo} onClick={handleClick} key={todo}>*/}
            {/*                /!* @ts-ignore *!/*/}
            {/*                {users.data.byId[todo].name}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*</ul>*/}
        </div>
    );
};

export default Main;
