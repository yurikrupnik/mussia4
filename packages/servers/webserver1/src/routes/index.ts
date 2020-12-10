// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import loadable from "@loadable/component";
import { Routes } from "../types";
import Dashboard from "./Dashboard";
import Login from "./Login";

// import React from "react";
import Main from "./Main";
// import Profile from "./Profile";
// import Error from "./Error";
// import Header from './Header';
// import Root from './Root';
// import Header from './Header/DefaultHeader';
// const Header = loadable(() => import(/* webpackChunkName: "DefaultHeader" */ './Header/DefaultHeader'));
// const Login = loadable(() => import(/* webpackChunkName: "login" */ "./Login"));
// import Brands from './Brands';
// import Careers from './Careers';
// import Dreamteam from './Dreamteam';
// import Groundcontrol from './Groundcontrol';

// const Main = loadable(() => import("./Main"));
// const Profile = loadable(() => import(/* webpackChunkName: "Profile" */ "./Profile"));
// const Error = loadable(() => import(/* webpackChunkName: "Error" */ "./Error"));
// const Groundcontrol = loadable(() => import(/* webpackChunkName: "Groundcontrol" */ './Groundcontrol'));
// // const Header = loadable(() => import(/* webpackChunkName: "header" */ './Header'));
// // todo check fails coz
// // const Screen1View = loadable(() =>
// // import(/* webpackChunkName: "screen1View" */ './screen1View'));
//
// const Brands = loadable(() => import(/* webpackChunkName: "brands" */ './Brands'));
// const Careers = loadable(() => import(/* webpackChunkName: "Careers" */ './Careers'));
// const Dreamteam = loadable(() => import(/* webpackChunkName: "Dreamteam" */ './Dreamteam'));
// const Shows = loadable(() => import(/* webpackChunkName: "Shows" */ './Shows'));

// const Register = loadable(() => import(/* webpackChunkName: "Register" */ './Register'));
// const ChatRoom = loadable(() => import(/* webpackChunkName: "ChatRoom" */ './ChatRoom'));
// const Projects = loadable(() => import(/* webpackChunkName: "Projects" */ './Projects'));

// import { RouteProps } from "react-router-dom";
// import { Routes } from "../types";
// import api from "../api/users/api";

// type Ro = RouteProps & {key: string;}

const routes: Routes = [
    {
        component: Main,
        path: "/",
        key: "main",
        exact: true,
        // aris: (url: string) => {
        //     console.log("url", url);
        //     return Promise.resolve([]);
        // },
        // aris() {
        //     return Promise.resolve(["ra"]);
        // },
    },
    {
        component: Login,
        path: "/",
        key: "login",
        exact: true,
    },
    // {
    //     component: Profile,
    //     path: "/profile/:id",
    //     key: "Profile",
    //     exact: true,
    //     // aris: (url: string) => {
    //     //     console.log("url", url);
    //     //     return Promise.resolve([]);
    //     // },
    //     // aris() {
    //     //     return Promise.resolve(["ra"]);
    //     // },
    // },
    // {
    //     path: '/',
    //     component: Header,
    //     // render: (props) => {
    //     //     const { location } = props;
    //     //     const { pathname } = location;
    //     //     // console.log(props)
    //     //     // console.log(pathname.includes('dashboard'))
    //     //     if (pathname.includes('dashboard')) {
    //     //         return null;
    //     //     }
    //     //     return (
    //     //         <Header />
    //     //     );
    //     // },
    //     key: 'root',
    //     // exact: true
    // },
    // {
    //     path: '/',
    //     component: Shows,
    //     key: 'main',
    //     exact: true
    // },
    {
        path: "/dashboard",
        component: Dashboard,
        key: "Dashboard",
    },
    // {
    //     path: "*",
    //     component: Error,
    //     key: "error",
    //     exact: true,
    // },
    // {
    //     path: '/dashboard',
    //     component: Screen1View,
    //     key: 'Screen1View',
    //     // exact: true
    // },
    // {
    //     path: '/brands',
    //     component: Brands,
    //     key: 'brands'
    // },
    // {
    //     path: '/careers',
    //     component: Careers,
    //     key: 'careers'
    // },
    // {
    //     path: '/dreamteam',
    //     component: Dreamteam,
    //     key: 'dreamteam',
    //     // exact: true
    // },
    // {
    //     path: '/groundcontrol',
    //     component: Groundcontrol,
    //     key: 'Shows',
    //     // exact: true
    // }
];

export default routes;
