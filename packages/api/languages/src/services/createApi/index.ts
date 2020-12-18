import { AxiosResponse } from "axios";
import { Api } from "../../types";
import request from "./request";

function handleResArray<T>(res: AxiosResponse): Promise<T[]> {
    return res.data;
}
function handleResObject<T>(res: AxiosResponse): Promise<T> {
    return res.data;
}
function handleResId(res: AxiosResponse): Promise<string> {
    return res.data;
}
function createApis<T>(url: string): Api<T> {
    return {
        name: url.split("/")[1],
        getQuery(key: string, params: Partial<T>) {
            return request.get(url, { params }).then((res: AxiosResponse) => handleResArray<T>(res));
            // return request.get(url, { params }).then((res: AxiosResponse): Promise<T[]> => res.data);
            // .catch((err) => {
            //     console.log("err", err);
            //     return err;
            // })
            // return request.get(url, { params }).then(handleRes);
        },
        getByIdQuery(key: string, id: string) {
            return request.get(`${url}/${id}`).then((res: AxiosResponse) => handleResObject<T>(res));
        },
        get(params?: Partial<T>) {
            return request.get(url, { params }).then((res: AxiosResponse) => handleResArray<T>(res));
        },
        getById(id: string) {
            return request.get(`${url}/${id}`).then((res: AxiosResponse) => handleResObject<T>(res));
            // .catch((error) => {
            //     throw error;
            // });
        },
        post(body: Partial<T>) {
            return request.post(`${url}`, body).then((res: AxiosResponse) => handleResObject<T>(res));
            // .catch((error) => {
            //     console.log("api error", error);
            //     throw error;
            // });
        },
        put(body: Partial<T>) {
            return request.put(`${url}`, body).then((res) => handleResObject<T>(res));
        },
        remove(id: string) {
            return request.delete(`${url}/${id}`).then(handleResId);
        },
    };
}
export default createApis;
