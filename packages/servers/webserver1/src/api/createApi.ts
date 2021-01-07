import { AxiosResponse } from "axios";
import request from "./request";

type Api<T, U> = {
    name: string;
    getById: (key: string, id: string) => Promise<T>;
    get: (key: string, params: Partial<T> & { projections?: keyof U[]; page?: number; limit?: number }) => Promise<T[]>;
    // getById: (id: string) => Promise<T>;
    post: (body: Partial<T>) => Promise<T>;
    put: (body: Partial<T>) => Promise<T>;
    remove: (id: string) => Promise<string>;
};

function handleResArray<T>(res: AxiosResponse): Promise<T[]> {
    return res.data;
}

function handleResObject<T>(res: AxiosResponse): Promise<T> {
    return res.data;
}
function handleResId(res: AxiosResponse): Promise<string> {
    return res.data;
}

function createApis<T, U>(url: string): Api<T, U> {
    return {
        name: url.split("/")[1],
        get(key: string, params: Partial<T> & { projections?: keyof U[]; page?: number; limit?: number }) {
            return request.get(url, { params }).then((res) => handleResArray<T>(res));
        },
        // getByIdQuery(key: string, id: string) {
        //     return request.get(`${url}/${id}`).then((res) => handleResObject<T>(res));
        // },
        getById(key: string, id: string) {
            return request.get(`${url}/${id}`).then((res) => handleResObject<T>(res));
        },
        post(body: Partial<T>) {
            return request.post(`${url}`, body).then((res) => handleResObject<T>(res));
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

export { Api };
