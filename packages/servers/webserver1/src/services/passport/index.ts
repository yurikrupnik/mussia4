import { Application } from 'express';
import passport from 'passport';
import {Request, Response, NextFunction} from 'express';
import auth from './auth';

export default (app:Application) => {
    auth(passport);
    app.use(passport.initialize());
    app.use(passport.session());
    // app.use(passport.authenticate('remember-me'));

    // return passport.authenticate('remember-me');
    return (req:Request, res:Response, next:NextFunction) => next();
    // app.use(passport.authenticate('remember-me'));
};
