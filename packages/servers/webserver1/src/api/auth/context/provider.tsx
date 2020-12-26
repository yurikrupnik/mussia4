import React, { useCallback, useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import PropTypes from 'prop-types';
import Cookie from "js-cookie";
// import { useLocation } from 'react-router-dom';
import Context from "./context";
import api from "../api";
import userApi from "../../users/api";

const localStore = {
    setItem(name: string, data: string) {
        return localStorage.setItem(name, data);
    },
    getItem(name: string) {
        return localStorage.getItem(name);
    },
    clearItem(name: string) {
        return localStorage.removeItem(name);
    },
};
// const clients = ["localhost", "ynet-tours", "nofshon", "amadeus"];

interface Props {
    children: React.FC;
}

const AuthProvider: React.FC<Props> = (props) => {
    // const history = useHistory();
    // console.log('history', history);
    const { children } = props;
    // const history = useHistory();
    const [session, setSession] = useState(global.document ? Cookie.get("user") : "");
    const [user, setUser] = useState(null);

    // console.log('user', user);
    // const toggleUserRole = useCallback(() => {
    //     if (user) {
    //         // userApi
    //         //     .put({
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-ignore
    //         // _id: user._id,
    //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //         // @ts-ignore
    //         // role: user.role === "admin" ? "client" : "admin",
    //         // })
    //         // .then(setUser);
    //     }
    // }, [user]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const setClientDomain = useCallback(
    //     // (e) => setUser({ ...user, domain: e.target.value }),
    //     [user]
    // );
    //
    // const isAdmin = useMemo(() => {
    //     if (!user) {
    //         return false;
    //     }
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     return user.role === "admin";
    // }, [user]);

    const register = useCallback(
        (body) =>
            api
                .register(body)
                .then(() => {
                    // using redirect = res is html
                    // const sess = Cookie.get("user");
                    // if (sess) {
                    //   setSession(sess);
                    //   return userApi
                    //     .getById(sess, null)
                    //     .then(setUser)
                    //     .then(() => history.push("/onboarding/onboarding-info"));
                    // }
                    // .then((r) => r);
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.error("err", err);
                }),
        []
    );

    const login = useCallback(
        (params) =>
            api
                .login(params)
                .then(() => {
                    const sess = Cookie.get("user");
                    if (sess) {
                        setSession(sess);
                        // return userApi.getById(sess, null).then((currentUser) => {
                        //     setUser(currentUser);
                        //     return currentUser;
                        // });
                    }
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.error("err", err);
                }),
        []
    );

    const logout = useCallback(() => {
        api.logout().then(() => {
            const rememberMe = localStore.getItem("rememberMe");
            if (rememberMe) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                userApi.put({ ...user, token: "" }).then(() => {
                    localStore.clearItem("rememberMe");
                    setSession(Cookie.get("user"));
                    setUser(null);
                });
            } else {
                setSession(Cookie.get("user"));
                setUser(null);
            }
        });
    }, [user]);

    useEffect(() => {
        if (session) {
            // userApi.getById(session, null).then(setUser);
        }
    }, []);

    useEffect(() => {
        const token = localStore.getItem("rememberMe");
        if (token && token !== "undefined" && !session) {
            // eslint-disable-next-line no-use-before-define
            login({ email: "test1", password: "21", token }).then(() => {
                // setUser(res);
                // if (res.onboardings.length) {
                //     history.push('/designer/sets');
                // } else {
                //     history.push('/onboarding/onboarding-info');
                // }
            });
        }
    }, [session]);

    // const isLoggedIn = useMemo(() => Boolean(session), [session]);
    // const forgotPassword = useCallback((body) => api.forgotPassword(body), []);
    // const resetPassword = useCallback((body) => api.resetPassword(body), []);
    return (
        <Context.Provider
            value={{
                // setUser,
                // isLoggedIn,
                // session,
                logout,
                login,
                register,
                // setClientDomain,
                // toggleUserRole,
                // clients,
                // user,
                // isAdmin,
                // localStore,
                // forgotPassword,
                // resetPassword,
            }}
        >
            {children}
        </Context.Provider>
    );
};

// AuthProvider.propTypes = {
//     children: PropTypes.element.isRequired
// };

export default AuthProvider;
