import passport from "passport";
import { Request, Response, NextFunction, Application } from "express";
import auth from "./auth";
import { createSocialNetworkRoutes } from "./utils";

export default (app: Application) => {
    auth(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    createSocialNetworkRoutes(app);
    // app.use(passport.authenticate('remember-me'));

    // return passport.authenticate('remember-me');
    return (req: Request, res: Response, next: NextFunction) => next();
    // app.use(passport.authenticate('remember-me'));
};
