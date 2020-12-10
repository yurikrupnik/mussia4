import express from "express";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import ejs from "ejs";
import cookieParser from "cookie-parser";
// import rateLimit from "express-rate-limit";
// import jwt from "jsonwebtoken";
import db from "./services/db";
import passport from "./services/passport";
import api from "./api";
import render from "./services/render";
// import App from "./components/App";
// import routes from "./routes";
// import { isProd } from './config.js';
import { isProd, databaseUrl } from "./config";

const app = express();

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
// });

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

// app.use("/callback", (req, res, next) => {
//     // console.log("res,", req.url);
//     // console.log("res,", req.params);
//     // console.log("query", req.query);
//     // console.log("callback req,isAuthenticated()", req.isAuthenticated());
//     // console.log("callback req,user", req.user);
//     // console.log("callback req,session", req.session);
//     // const token = req.headers["x-access-token"] || req.headers.authorization;
//     //if no token found, return response (without going to the next middelware)
//     console.log("token", req.query.token);
//     // if (!token) return res.status(401).send("Access denied. No token provided.");
//
//     // try {
//     //if can verify the token, set req.user and pass to next middleware
//     jwt.verify(req.query.token, "shhhhh", (err: any, payload: any) => {
//         console.log("err", err);
//         console.log("payload", payload);
//         if (err) {
//             console.log("err", err);
//             return next;
//             // res.status(406).send("invalid token");
//         }
//         // res.sendStatus(200);
//         return next;
//         // UsersModel.findOne({ _id: payload._id })
//         //     // eslint-disable-next-line
//         //     .then((user) => {
//         //         if (user) {
//         //             return generateHash(password).then((hash) => {
//         //                 // todo get somehow old password to compare if the same
//         //                 user.hashPassword = hash; // eslint-disable-line
//         //                 user.save((error) => {
//         //                     if (error) {
//         //                         res.status(500).send("failed to save user password");
//         //                     } else {
//         //                         res.redirect("/login");
//         //                     }
//         //                 });
//         //             });
//         //         }
//         //         res.status(304).json("user not found");
//         //     })
//         //     .catch();
//     });
//     // const decoded = jwt.verify("", "myprivatekey");
//     // console.log("decoded", decoded);
//     // req.user = decoded;
//     return next();
//     // } catch (ex) {
//     //     //if invalid token
//     //     console.log({ ex });
//     //     res.status(400).send("Invalid token.");
//     // }
//     return next;
// });

app.use(api);
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.isAuthenticated()) {
        console.log("Authenticated"); // eslint-disable-line no-console
        // console.log("res.user", req.user);
        // const token = jwt.sign({ _id: "aris" }, "shhhhh", {
        //     expiresIn: "2h",
        // });
        // console.log("token", token);
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
