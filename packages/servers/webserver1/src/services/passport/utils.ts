import passport from "passport";
import { Request, Application } from "express";
import { validatePassword } from "./crypt";
import User from "../../api/users/model";

const serialize = (user: any, done: any) => done(null, user._id);

const deserialize = (_id: string, done: any) => User.findOne({ _id }, done);

const checkValidUser = (user: any, done: any) => (valid: boolean) => {
    if (!valid) {
        done(null, false, { message: "invalid user", user }); // todo check it
    } else {
        done(null, user);
    }
};

// eslint-disable-next-line
const checkUserByEmailAndPass = (req: Express.Request, email: string, password: string, done: any) => (user: any) => {
    if (!user) {
        done("error here", null);
        // done(new Error({ message: 'second custom error try' }), null, {
        //     message: 'second custom error try'
        // });
    } else {
        return validatePassword(password, user.hashPassword).then(checkValidUser(user, done));
    }
};

const localStrategyHandler = (req: Request, email: string, password: string, done: any) => {
    if (req.body.token) {
        User.findOne({ token: req.body.token })
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    } else {
        User.findOne({ email })
            // eslint-disable-next-line
            .then((user) => {
                if (!user) {
                    done({ message: "no suyser" }, null, { messages: ["lkok"] });
                } else {
                    return user;
                }
            })
            .then(checkUserByEmailAndPass(req, email, password, done))
            .catch(done);
    }
};

const socialAppsRegisterCallback = (profile: any, done: any) => () =>
    User.findOne({ id: profile.id })
        .then((user) => {
            if (user) {
                done(null, user);
            } else {
                const { provider } = profile;
                const newUser = new User({
                    id: profile.id,
                    email: profile.email || "",
                    name: provider === "facebook" ? profile.displayName : profile.fullName,
                });
                newUser.save(done);
            }
        })
        .catch(done);

const socialNetworkStrategy = (token: string, refreshTocken: any, profile: any, done: any) =>
    process.nextTick(socialAppsRegisterCallback(profile, done));

const setSocialAuth = (provider: string) =>
    passport.authenticate(provider, {
        successRedirect: "/",
        failureRedirect: "/",
        scope: ["email"],
    }); // handling fail with router

const createSocialNetworkRoutes = (app: Application) => {
    const socialNetworks = ["facebook"];
    socialNetworks.forEach((provider) => {
        // register middlewares
        app.get(`/auth/${provider}`, setSocialAuth(provider));
        app.get(`/auth/${provider}/callback`, setSocialAuth(provider));
    });
};

export { serialize, deserialize, socialNetworkStrategy, localStrategyHandler, createSocialNetworkRoutes };
