import { Request, Response } from "express";
import mongoose from "mongoose";
// import { IUser } from "../types";

const responseId = (req: Request, res: Response) => {
    const { id } = req.params;
    // const responseBody = Array.isArray(id) ? id : [id];
    const statusCode = 202;
    return () => res.status(statusCode).json(id);
};

const handleError = (res: Response) => {
    const statusCode = 500;
    return (err: Error) => res.status(statusCode).send(err);
};

const respondWithResult = (res: Response) => (entity: any) => res.status(200).json(entity);

// todo check statics
const schema = (Model: mongoose.Model<never>) => (req: Request, res: Response) =>
    res.status(200).json(Model.schema.statics);

// type dmMo = IUser | {};

const list = (Model: mongoose.Model<any>) => (req: Request, res: Response) =>
    Model.find(req.query).then(respondWithResult(res)).catch(handleError(res));

const find = (Model: mongoose.Model<any>) => (req: Request, res: Response) =>
    Model.find({ _id: req.params.id }).then(respondWithResult(res)).catch(handleError(res));

const removeOne = (Model: mongoose.Model<any>) => (req: Request, res: Response) =>
    Model.findOneAndRemove({ _id: req.params.id }).then(responseId(req, res)).catch(handleError(res));

const create = (Model: mongoose.Model<any>) => (req: Request, res: Response) => {
    const user = new Model(req.body);
    return user.save().then(respondWithResult(res)).catch(handleError(res));
};

const update = (Model: mongoose.Model<any>) => (req: Request, res: Response) =>
    Model.findOneAndUpdate(
        {
            _id: req.body._id, // eslint-disable-line no-underscore-dangle
        },
        req.body,
        {
            new: true,
        }
    )
        .then(respondWithResult(res))
        .catch(handleError(res));

export { schema, list, find, removeOne, create, update };
