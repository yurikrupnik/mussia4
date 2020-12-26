import express from "express";
// import redisCache from 'express-redis-cache';
// import passport from "passport";
import auth from "./auth";
// import props from './props';
// import onboarding from './onboarding';
// import styles from './styles';
// import components from './components';
// import themes from './themes';
// import productsTypes from './productsTypes';
// import companyTypes from './companyTypes';
// import languages from './languages';
// import currencies from './currencies';
// import sets from './sets';
import users from "./users";
import projects from "./projects";
// import { google, googleCallback } from "./auth/config";
// import router from "./auth";
// import localization from './localization';
// import data from './data';
// import clients from './clients';
// import settings from './settings';
// import pages from './pages';
// import palettes from './palettes';

// const cache = redisCache();
const route = express.Router();

// route.get(google, passport.authenticate("google", { scope: ["profile", "email"] }));
// route.get(googleCallback, passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
//     res.redirect("/dashboard");
// });
route.use("/api", [auth, users, projects]);
// when redis is in production todo>
// todo can add cache cache.route() middle before array
// route.use('/api', [
//     // styles,
//     // themes,
//     // props,
//     // components,
//     // projects,
//     // currencies,
//     // languages,
//     // productsTypes,
//     // companyTypes,
//     // sets,
//     // localization,
//     // data,
//     // clients,
//     // settings,
//     // pages,
//     // palettes
// ]);

export default route;
