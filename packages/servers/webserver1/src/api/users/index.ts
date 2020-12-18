import express from "express";
import jwt from "jsonwebtoken";
import { Model as Mode, Document } from "mongoose";
import { url as ul } from "./config";
import UsersModel, { UserDocument, UserModel } from "./model";
import { list, find, removeOne, create, update } from "../methods";
import { resetPassword, forgotPassword } from "../auth/config";
// import { sendEmail } from "../../services/email";
import { generateHash } from "../../services/passport/crypt";
// import { MongoModel } from "../../types";
// import { IUser } from "../../types";
// import { IUser } from "../../types";

function createApiBackend<Doc extends Document, T extends Mode<Doc>>(url: string, Model: T) {
    const route = express.Router();
    route.get(url, list(Model)); // array

    route.get(`${url}/:id`, find(Model)); // object
    route.post(url, create(Model));

    route.put(url, update(Model));

    route.delete(`${url}/:id`, removeOne(Model)); // id

    route.post(forgotPassword, (req, res) => {
        const { email } = req.body;
        Model.findOne({ email }).then((user) => {
            // const origin = req.get("origin");
            if (!user) {
                return res.status(304).json("no user");
                // eslint-disable-next-line
            } else {
                console.log("send email");
                return res.sendStatus(200);
                // const token = jwt.sign({ _id: user._id }, "shhhhh", {
                //     expiresIn: "2h",
                // });
                //         return sendEmail(
                //             "lo",
                //             "Recover password",
                //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //             // @ts-ignore
                //             `<div><h3>Dear ${user.email},</h3>
                //     <p>You requested for a password reset, kindly use this <a href="${origin}/resetPassword/${token}">link</a> to reset your password</p>
                //     <br>
                //     <p>Cheers!</p>
                // </div>`,
                //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //             // @ts-ignore
                //             user.email,
                //             "yes here",
                //             (error: Error, info: any) => {
                //                 if (error) {
                //                     res.status(304).json("failed sending email");
                //                 } else {
                //                     res.status(200).json(info);
                //                 }
                //             }
                //         );
            }
        });
    });

    route.post(resetPassword, (req, res) => {
        const { token, password } = req.body;
        jwt.verify(token, "shhhhh", (err: any, payload: any) => {
            if (err) {
                res.status(406).send("invalid token");
            } else {
                // eslint-disable-next-line no-underscore-dangle
                Model.findOne({ _id: payload._id })
                    // eslint-disable-next-line
                    .then((user) => {
                        if (user) {
                            return generateHash(password).then((hash) => {
                                // todo get somehow old password to compare if the same
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                user.hashPassword = hash; // eslint-disable-line
                                user.save((error) => {
                                    if (error) {
                                        res.status(500).send("failed to save user password");
                                    } else {
                                        res.redirect("/login");
                                    }
                                });
                            });
                        }
                        res.status(304).json("user not found");
                    })
                    .catch();
            }
        });
    });
    return route;
}

// const route = express.Router();
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

// route.get(url, list(Model)); // array
//
// route.get(`${url}/:id`, (req: Request, res: Response) => {
//     Model.findById(req.params.id)
//         //     .then((item) => {
//         //     item.
//         // })
//         // Model.findOne({ _id: req.params.id })
//         //     // .populate("projects", "name")
//         .then((data) => {
//             // data.
//             // console.log({ data });
//             res.status(200).json(data);
//         })
//         .catch((err) => res.status(500).json(err));
// }); // object
// route.post(url, (req: Request, res: Response) => {
//     // console.log("req", req.body);
//     // res.send("ds");
//     // const user = new Model(req.body);
//     Model.create(req.body)
//         .then((r) => {
//             res.status(200).json(r);
//         })
//         .catch((err) => res.status(500).json(err));
//     // return user.save().then(respondWithResult(res)).catch(handleError(res));
// });
//
// route.put(url, async (req, res) => {
//     Model.findOneAndUpdate(
//         {
//             _id: req.body._id, // eslint-disable-line no-underscore-dangle
//         },
//         req.body,
//         {
//             new: true,
//             useFindAndModify: false,
//         }
//     )
//         //     // .populate("projects", "name")
//         .then((data) => res.status(200).json(data))
//         .catch((err) => res.status(500).json(err));
//     // );
// });
//
// route.delete(`${url}/:id`, (req: Request, res: Response) => {
//     Model.findByIdAndDelete(req.params.id)
//         .then((item) => {
//             if (!item) {
//                 return res.status(300).json({});
//             }
//             // eslint-disable-next-line no-underscore-dangle
//             return res.status(200).json(item._id);
//         })
//         .catch((err) => res.status(500).json(err));
// }); // id
//
// route.post(forgotPassword, (req, res) => {
//     const { email } = req.body;
//     Model.findOne({ email }).then((user) => {
//         // const origin = req.get("origin");
//         if (!user) {
//             return res.status(304).json("no user");
//             // eslint-disable-next-line
//         } else {
//             console.log("send email");
//             return res.sendStatus(200);
//             // const token = jwt.sign({ _id: user._id }, "shhhhh", {
//             //     expiresIn: "2h",
//             // });
//             //         return sendEmail(
//             //             "lo",
//             //             "Recover password",
//             //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             //             // @ts-ignore
//             //             `<div><h3>Dear ${user.email},</h3>
//             //     <p>You requested for a password reset, kindly use this <a href="${origin}/resetPassword/${token}">link</a> to reset your password</p>
//             //     <br>
//             //     <p>Cheers!</p>
//             // </div>`,
//             //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             //             // @ts-ignore
//             //             user.email,
//             //             "yes here",
//             //             (error: Error, info: any) => {
//             //                 if (error) {
//             //                     res.status(304).json("failed sending email");
//             //                 } else {
//             //                     res.status(200).json(info);
//             //                 }
//             //             }
//             //         );
//         }
//     });
// });
//
// route.post(resetPassword, (req, res) => {
//     const { token, password } = req.body;
//     jwt.verify(token, "shhhhh", (err: any, payload: any) => {
//         if (err) {
//             res.status(406).send("invalid token");
//         } else {
//             // eslint-disable-next-line no-underscore-dangle
//             Model.findOne({ _id: payload._id })
//                 // eslint-disable-next-line
//                 .then((user) => {
//                     if (user) {
//                         return generateHash(password).then((hash) => {
//                             // todo get somehow old password to compare if the same
//                             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                             // @ts-ignore
//                             user.hashPassword = hash; // eslint-disable-line
//                             user.save((error) => {
//                                 if (error) {
//                                     res.status(500).send("failed to save user password");
//                                 } else {
//                                     res.redirect("/login");
//                                 }
//                             });
//                         });
//                     }
//                     res.status(304).json("user not found");
//                 })
//                 .catch();
//         }
//     });
// });

export default createApiBackend<UserDocument, UserModel>(ul, UsersModel);
