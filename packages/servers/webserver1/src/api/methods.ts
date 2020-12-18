import { Request, Response } from "express";
// import omit from "lodash/omit";
import mongoose from "mongoose";
// import { UserDocument } from "./users/model";
// import { UserModel, UserDocument, UserFront } from "./users/model";
// import { ProjectFront, ProjectDocument, ProjectModel } from "./projects/model";
// const route = express.Router();

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

// const respondWithResult = (res: Response) => <T>(entity: T) => res.status(200).json(entity);

function respondWithResult<T>(res: Response) {
    return (entity: T) => res.status(200).json(entity);
}

// export type CustomRequest<
//     A,
//     B extends Request["body"],
//     C extends Request["params"]
//     // D extends string[]
// > = Request & {
//     query: Partial<A> & { projections?: keyof A[] };
//     body: B;
//     params: C;
//     // projections: string[];
// };

// interface BackemdApi<T> {
//     list(model: any): void;
// }

const list = <T extends mongoose.Model<any>>(Model: T) => (req: Request, res: Response) => {
    // console.log("req.query", req.query); // got alsmost dynamic query
    const { projections } = req.query;
    // console.log("typeof projections;", typeof projections);
    // console.log("projection", projection);
    Model.find(req.query, projections, {})
        .then(respondWithResult(res))
        // .then((entity) => {
        //     next(entity);
        // entity[0]
        // res.status(200).json(entity);
        // })
        .catch(handleError(res));
};

const find = (Model: any) => (req: Request, res: Response) => {
    Model.findOne({ _id: req.params.id }).then(respondWithResult(res)).catch(handleError(res));
};

const removeOne = (Model: mongoose.Model<any>) => (req: Request, res: Response) =>
    Model.findByIdAndDelete(req.params.id).then(responseId(req, res)).catch(handleError(res));

const create = (Model: mongoose.Model<any>) => (req: Request, res: Response) =>
    Model.create(req.body).then(respondWithResult(res)).catch(handleError(res));

const update = (Model: mongoose.Model<any>) => (req: Request, res: Response) =>
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
        .then(respondWithResult(res))
        .catch(handleError(res));

export { list, find, update, create, removeOne };
