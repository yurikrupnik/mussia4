import { ThemeOptions } from "@material-ui/core/styles";
import { RouteProps } from "react-router-dom";
import { AxiosPromise } from "axios";

export type Theme = Partial<
    ThemeOptions & {
        palette: {
            special?: {
                main: string;
                light: string;
                dark: string;
                contrastText: string;
            };
        };
    }
>;

// type fin = AxiosPromise:AxiosPromise

// type preFetch = () => Promise<[]>;
type CallbackFunction = () => AxiosPromise;
type Route = RouteProps & { key: string; preFetch?: CallbackFunction };

type Role = "agent" | "editor" | "designer" | "admin" | "superman";

export interface IUser {
    email: string;
    token: string;
    hashPassword: string;
    // firstName: string;
    // lastName: string;
    name: string;
    projectKey: string;
    // ip: string;
    // avatar: string;
    // domainName: string;
    // domainWord: string;
    // domainSuffix: string;
    // ipv6: string;
    userAgent: string;
    // mac: string;
    role: Role;
    updatedAt: Date;
    createdAt: Date;
    _id: string;
}
export interface IProject {
    name: string;
    userId: IUser["_id"];
    description: string;
    // email: string;
    // token: string;
    // hashPassword: string;
    // // firstName: string;
    // // lastName: string;
    // name: string;
    // projectKey: string;
    // // ip: string;
    // // avatar: string;
    // // domainName: string;
    // // domainWord: string;
    // // domainSuffix: string;
    // // ipv6: string;
    // userAgent: string;
    // // mac: string;
    // role: Role;
    updatedAt: Date;
    createdAt: Date;
    _id: string;
}
export type Routes = Array<Route>;
