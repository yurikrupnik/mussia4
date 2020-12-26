import { createContext } from "react";
// import noop from "lodash/noop";
import { User } from "../../users/model";
// import { Client } from "../../clients/model";
import api from "../api";
// import localStore from '../../../utils/localStorage';

export interface AuthContext {
    // reset: () => void;
    // user: User | null;
    // client: any; // todo change to client model
    // isLoggedIn: boolean;
    // session?: string;
    // setUser: (user: any) => void;
    // forgotPassword: (params: Partial<User>) => Promise<Partial<User>>;
    // resetPassword: (params: Partial<User>) => Promise<Partial<User>>;
    // checkUserExists: (params: Partial<User>) => Promise<Partial<User>>;
    // updatePass: (params: Partial<User>) => Promise<Partial<User>>;
    logout: () => void;
    login: (body: Partial<User> & { rememberMe: boolean }) => Promise<any>;
    register: (body: Partial<User>) => Promise<any>;
    // toggleUserRole: () => void;
    // // localStore: {
    // //     // removeItem: (name: string) => void;
    // //     // clear: (name: string) => void;
    // // };
    // setClient: (client: any) => void;
    // tokenID: string | undefined;
}

export default createContext<AuthContext>({
    // user: null,
    // client: null,
    // isLoggedIn: false,
    // session: "",
    // forgotPassword: api.forgotPassword,
    // resetPassword: api.resetPassword,
    // // checkUserExists: api.checkUserExists,
    // // updatePass: api.updatePass,
    logout: api.logout,
    login: api.login,
    register: api.register,
    // toggleUserRole: noop,
    // // localStore,
    // setUser: noop,
    // setClient: noop,
    // reset: noop,
    // tokenID: "",
});
