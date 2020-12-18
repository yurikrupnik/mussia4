import { BaseContext } from "koa";
import mongoose, { Document } from "mongoose";

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

const schema = <T extends Document>(Model: mongoose.Model<T>) => (ctx: BaseContext) => {
    ctx.body = "helli fro";
};

const find = <T extends Document>(Model: mongoose.Model<T>) => (ctx: BaseContext) => {
    // Model.findOne({ _id: ctx.params.id })
    ctx.body = "list here";
};
// const list = (ctx: BaseContext) => {
//     ctx.body = "list here";
// };

const removeOne = (Model: mongoose.Model<any>) => (ctx: BaseContext) => {
    ctx.body = "list here";
};
const create = (Model: mongoose.Model<any>) => (ctx: BaseContext) => {
    ctx.body = "list here";
};
const update = (Model: mongoose.Model<any>) => (ctx: BaseContext) => {
    ctx.body = "list here";
};

export { schema, find, list, create, update, removeOne };
