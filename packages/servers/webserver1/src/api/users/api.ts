// import axios from "axios";
import request from "../request";
import { url } from "./config";
import { IUser } from "../../types";
// import { formatData } from "../providersHelpers";

const api = {
    // getSchema() {
    //     return request
    //         .get(`${url}/schema`)
    //         .then((res) => res.data)
    //         .catch((error) => {
    //             throw error;
    //         });
    // },
    get(key: string, params: Partial<IUser>) {
        // console.log("key", key);
        return request.get(`${url}`, { params }).then(
            (res): Promise<Array<IUser>> => {
                console.log("res.data", res.data);
                // return formatData(res.data);
                return res.data;
            }
        );
    },
    getById(id: string) {
        return request.get(`${url}/${id}`).then((res): Promise<IUser> => res.data);
        // .catch((error) => {
        //     throw error;
        // });
    },
    post(body: Partial<IUser>) {
        return request.post(`${url}`, body).then((res): Promise<IUser> => res.data);
        // .catch((error) => {
        //     console.log("api error", error);
        //     throw error;
        // });
    },
    put(body: Partial<IUser>) {
        return request.put(`${url}`, body).then((res): Promise<IUser> => res.data);
        // .catch((error) => {
        //     throw error;
        // });
    },
    remove(id: string) {
        return request.delete(`${url}/${id}`).then((res): string => res.data); // returns id
        // .catch((error) => {
        //     throw error;
        // });
    },
};

export default api;
