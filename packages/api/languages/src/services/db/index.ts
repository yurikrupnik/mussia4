import mongoose from "mongoose";
import { Next, BaseContext } from "koa";
// import Router from "koa-router";
// import session from "express-session";
// import connect from "connect-mongo";

export default (url: string) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
    });
    const db = mongoose.connection;
    mongoose.Promise = global.Promise;
    // const opts = { url };
    // const MongoStore = connect(session);
    db.on("error", console.error.bind(console, "connection error:")); // eslint-disable-line no-console
    db.on("connected", console.log.bind(console, "connected:")); // eslint-disable-line no-console
    db.on("open", console.log.bind(console, "open:")); // eslint-disable-line no-console
    db.once("disconnected", console.log.bind(console, "disconnected:")); // eslint-disable-line no-console

    return (ctx: BaseContext, next: Next) => next();
    // return session({
    //     // name: 'app',
    //     secret: "slomo",
    //     saveUninitialized: false,
    //     resave: false, // need to touch and then can use false as the value
    //     store: new MongoStore(opts),
    //     cookie: {
    //         maxAge: 86400 * 1000,
    //     },
    // });
};
