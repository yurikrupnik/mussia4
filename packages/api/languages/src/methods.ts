import { BaseContext } from "koa";
import mongoose from "mongoose";

const list = (Model: mongoose.Model<any>) => (ctx: BaseContext) =>
    Model.find(ctx.query)
        .then((data) => {
            ctx.status = 200;
            ctx.body = data;
        })
        // .catch(handleError(res))
        .catch(() => {
            // console.log(err);
            ctx.status = 404;
        });

const schema = () => (ctx: BaseContext) => {
    ctx.body = "helli fro";
};

const find = () => (ctx: BaseContext) => {
    // Model.findOne({ _id: ctx.params.id })
    ctx.body = "list here";
};
// const list = (ctx: BaseContext) => {
//     ctx.body = "list here";
// };

const removeOne = () => (ctx: BaseContext) => {
    ctx.body = "list here";
};
const create = () => (ctx: BaseContext) => {
    ctx.body = "list here";
};
const update = () => (ctx: BaseContext) => {
    ctx.body = "list here";
};

export { schema, find, list, create, update, removeOne };
