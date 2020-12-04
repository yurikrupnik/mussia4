import { createContext } from "react";
// import { IUser } from "../../../types";
// import { useMutation } from "react-query";
// import api from "../api";
// import { IUser } from "../../../types";
// import { useMutation } from "react-query";
// import api from "../api";

interface Context {
    // data: IUser[] | undefined;
    error: Error | null;
    // remove: (id: string) => Promise<string>;
    // post: (body: Partial<IUser>) => Promise<IUser>;
    // put: (body: Partial<IUser>) => Promise<IUser>;
    // customQuery: Partial<IUser>;
    // setCustomQuery: (params: Partial<IUser>) => void;
    // ad: string;
    // setQuery: (query: Partial<IUser>) => Promise<any>;
}

export default createContext(<Context>{
    // ad: "ads",
    // data: [
    //     {
    //         _id: "asd",
    //         name: "aris",
    //     },
    // ],
    // add: useMutation(api.remove, {}),
    // add: () => Promise.resolve(),
    // put: useMutation(api.put, {}),
});
