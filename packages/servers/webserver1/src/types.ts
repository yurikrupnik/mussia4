import { ThemeOptions } from "@material-ui/core/styles";
import { RouteProps } from "react-router-dom";
import { AxiosPromise } from "axios";
import { Document, Model } from "mongoose";

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

export type Routes = Array<Route>;

export interface MongoModel<T extends Document> extends Model<T> {
    [key: string]: unknown;
}
export type SchemaFilter = "createdAt" | "updatedAt";
