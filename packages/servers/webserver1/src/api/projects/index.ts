import express, { Response, Request } from "express";
// import { Model as Mode } from "mongoose";
import { url } from "./config";
import Model, { ProjectModel } from "./model";
import { list } from "../methods";
// import { sendEmail } from "../../services/email";
// import { MongoModel } from "../../types";
// import { IUser } from "../../types";

// import { IUser } from "../../types";

const route = express.Router();
// import { IUser } from "../../types";
// Model.

// type sd = typeof Model;
// type sd = Extract<typeof Model, IUser>;

// const s: sd = {};

// route.get(`${url}/schema`, schema(User)); // array

// route.get(url, list(Model));
export type CustomRequest<T, U> = {
    query: T;
    body: U;
};

route.get(url, list(Model)); // array

route.get(`${url}/:id`, (req: Request, res: Response) => {
    Model.findById(req.params.id)
        //     .then((item) => {
        //     item.
        // })
        // Model.findOne({ _id: req.params.id })
        //     // .populate("projects", "name")
        .then((data) => {
            // data.
            // console.log({ data });
            res.status(200).json(data);
        })
        .catch((err) => res.status(500).json(err));
}); // object
route.post(url, (req: Request, res: Response) => {
    // console.log("req", req.body);
    // res.send("ds");
    // const user = new Model(req.body);
    Model.create(req.body)
        .then((r) => {
            res.status(200).json(r);
        })
        .catch((err) => res.status(500).json(err));
    // return user.save().then(respondWithResult(res)).catch(handleError(res));
});

route.put(url, async (req, res) => {
    Model.findOneAndUpdate(
        {
            _id: req.body._id, // eslint-disable-line no-underscore-dangle
        },
        req.body,
        {
            new: true,
            useFindAndModify: false,
        }
    )
        //     // .populate("projects", "name")
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
    // );
});

route.delete(`${url}/:id`, (req: Request, res: Response) => {
    Model.findByIdAndDelete(req.params.id)
        .then((item) => {
            if (!item) {
                return res.status(300).json({});
            }
            // eslint-disable-next-line no-underscore-dangle
            return res.status(200).json(item._id);
        })
        .catch((err) => res.status(500).json(err));
}); // id

export default route;
