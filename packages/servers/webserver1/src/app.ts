import express from "express";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import ejs from "ejs";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import db from "./services/db";
import passport from "./services/passport";
import api from "./api";
import render from "./services/render";
// import App from "./components/App";
// import routes from "./routes";
// import { isProd } from './config.js';
import { isProd, databaseUrl } from "./config";

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
// app.use(limiter);

const assets = path.join(process.cwd(), !isProd ? "dist" : "", "assets");
// const files = path.join(process.cwd(), !isProd ? 'dist' : '', '');

app.use(helmet());
app.use(morgan("dev"));
app.use(express.static(assets));
app.use(express.json(), express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", assets);

app.use("/report", (req, res) => {
    app.engine("html", ejs.renderFile);
    app.set("view engine", "html");
    return res.render("report.html");
});
app.use(cookieParser());
app.use(db(databaseUrl));
app.use(passport(app));
app.use(limiter, api);
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.isAuthenticated()) {
        console.log("Authenticated"); // eslint-disable-line no-console
        // res.cookie("user", req.user!._id.toString(), { maxAge: 7 * 86400 * 1000 });
    } else {
        console.log("Authenticated not"); // eslint-disable-line no-console
        // res.cookie("user", "");
    }
    return next();
});

// app.use((error, req, res, next) => {
//     console.log('error.stack', error.stack); // eslint-disable
//     // console.log('error.me', error.message);
//     // console.log('error.status', error.status);
//     // res.status(error.status).json(error.message);
//     return next();
// });

app.use(render(null, [], assets));

export default app;
