// import express from "";
import Router from "koa-router";
import { url } from "./config";
import Model from "./model";
// import { schema, list, find, removeOne, create, update } from "../methods";

const router = new Router();

// router.get(`${url}/schema`, schema(Model)); // array
router.get(
    url,
    (ctx) =>
        // console.log("ctx", ctx.params);
        // console.log("ctx", ctx.query);
        Model.find(ctx.query).then((r) => {
            // console.log("r", r.map(v => {
            //     return v._id
            // });
            ctx.status = 200;
            ctx.body = r;
        })
    // return next();
    // console.log("s");
); // array
// router.get(`${url}/:id`, find(Model)); // object
// router.post(url, create(Model));
// //
// router.put(url, update(Model));
//
// router.delete(`${url}/:id`, removeOne(Model)); // id
export default router.routes();
