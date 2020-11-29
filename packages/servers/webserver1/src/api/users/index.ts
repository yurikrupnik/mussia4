import express, { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { url } from "./config";
import Model from "./model";
import { schema } from "../methods";
import { resetPassword, forgotPassword } from "../auth/config";
// import { sendEmail } from "../../services/email";
import { generateHash } from "../../services/passport/crypt";
import { IUser } from "../../types";
// import { IUser } from "../../types";

const route = express.Router();
// import { IUser } from "../../types";
// Model.

// type sd = typeof Model;
// type sd = Extract<typeof Model, IUser>;

// const s: sd = {};

route.get(`${url}/schema`, schema(Model)); // array

// route.get(url, list(Model));
route.get(url, (req: Request, res: Response) => {
    Model.find(req.query)
        // .lean()
        .then((data) => {
            res.status(200).json(data);
        });
}); // array

route.get(`${url}/:id`, (req: Request, res: Response) => {
    Model.findById(req.params.id)
        //     .then((item) => {
        //     item.
        // })
        // Model.findOne({ _id: req.params.id })
        //     // .populate("projects", "name")
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
}); // object
route.post(url, async (req: Request, res: Response) => {
    const {
        email,
        name,
        password,
        // hashPassword
    } = req.body as IUser & { password: string };
    const user = new Model({
        email,
        name,
        hashPassword: await generateHash(password),
    } as IUser & { password: string });
    user.save()
        .then((r) => {
            res.status(200).json(r);
        })
        .catch((err) => res.status(500).json(err));
    // return user.save().then(respondWithResult(res)).catch(handleError(res));
});

route.put(url, (req, res) => {
    Model.findOneAndUpdate(
        {
            _id: req.body._id, // eslint-disable-line no-underscore-dangle
        },
        req.body,
        {
            new: true,
        }
    )
        .populate("projects", "name")
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));
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

export default route;
