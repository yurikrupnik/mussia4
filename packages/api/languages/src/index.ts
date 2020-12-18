// import path from "path";
import Koa from "koa";
// import statics from "koa-static";
// import views from "koa-render-view";
// import favicon from "koa-favicon";
// import React from "react";
// import Loadable from "react-loadable";
// import { renderToString } from "react-dom/server";
// import { StaticRouter, matchPath } from "react-router";
// import mongoose from "mongoose";
import { port, databaseUrl } from "./config";
import api from "./api";
import db from "./services/db";

const app = new Koa();

app.use(db(databaseUrl));
app.use(api);

app.listen(port, () => {
    //     if (err) {
    //         console.log("err", err); // eslint-disable-line no-console
    //     } else {
    console.log(`running at port: ${port}`); // eslint-disable-line no-console
    // }
});
// });
