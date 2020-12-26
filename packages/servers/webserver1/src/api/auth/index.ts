import express from "express";
import passport from "passport";
import { login, logout, register } from "./config";
import UsersModel from "../users/model";
import { generateHash } from "../../services/passport/crypt";

const router = express.Router();

router.post(
    login,
    passport.authenticate("local", { failWithError: true }),
    (req: express.Request, res: express.Response) => {
        // console.log('res.status', res.status);
        // res.status(200).json(req.user._id);
        res.redirect("/dashboard");
    },
    (err: Error, req: express.Request, res: express.Response) => {
        console.log("login error", err);
        res.status(500).send(err);
    }
);

const handleHash = (user: any) => (hash: string) => {
    user.hashPassword = hash; // eslint-disable-line no-param-reassign
    return user;
};
// router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
// router.get(googleCallback, passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
//     res.redirect("/dashboard");
// });
// router.get(google, passport.authenticate("google", { scope: ["profile"] }));
// router.get(google, (req, res) => {
//     res.status(200).json("ok");
// });
//
// router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect("/");
// });
router.post(register, (req: express.Request, res: express.Response) => {
    const { email, password, username } = req.body;
    UsersModel.findOne({ email }).then((user) => {
        if (user) {
            res.status(400).json({
                message: "User exists",
            });
        } else {
            generateHash(password)
                .then(
                    handleHash(
                        new UsersModel({
                            email,
                            username,
                        })
                    )
                )
                .then((newUser) => {
                    newUser.save((err: Error, result: any) => {
                        if (err) {
                            throw err;
                        } else {
                            req.login(result, (error) => {
                                if (error) {
                                    throw error;
                                } else {
                                    // res.status(200).send(user);
                                    res.redirect("/onboarding/step3");
                                }
                            });
                        }
                    });
                });
        }
    });
});

router.get(logout, (req: express.Request, res: express.Response, next) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.session.destroy((err) => {
        if (err) {
            next(err);
        } else {
            res.redirect("/designer/sets");
        }
    });
});

export default router;
