import passport from "passport";
import { Request, Application } from "express";
import { validatePassword } from "./crypt";
import UserM, { User } from "../../api/users/model";

const serialize = (user: any, done: any) => done(null, user._id);

const deserialize = (_id: string, done: any) => UserM.findOne({ _id }, done);

const checkValidUser = (user: User, done: any) => (valid: boolean) => {
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
        // done(new Error("second custom error try"), null, {
        //      message: "second custom error try1111",
        // });
    } else {
        return validatePassword(password, user.password).then(checkValidUser(user, done));
    }
};

const localStrategyHandler = (req: Request, email: string, password: string, done: any) => {
    if (req.body.token) {
        UserM.findOne({ token: req.body.token })
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    } else {
        UserM.findOne({ email })
            // eslint-disable-next-line
            .then((user) => {
                if (!user) {
                    done({ message: "no suyser" }, null, "omg some message");
                } else {
                    return user;
                }
            })
            .then(checkUserByEmailAndPass(req, email, password, done))
            .catch(done);
    }
};

const socialAppsRegisterCallback = (profile: any, token: string, refreshTocken: string, done: any) => () => {
    console.log("token", token);

    console.log("refreshTocken", refreshTocken);
    UserM.findOne({ id: profile.id })
        .then((user) => {
            if (user) {
                done(null, user);
            } else {
                const { provider } = profile;
                const newUser = new UserM({
                    id: profile.id,
                    // password: "asd",
                    email: profile.emails[0].value,
                    image: profile.photos[0].value,
                    provider,
                    token,
                    // name: provider === "facebook" ? profile.displayName : profile.fullName,
                    // firstName: provider.name.givenName,
                    firstName: profile.name.givenName,
                    // lastName: provider.name.familyName,
                    // firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    // lastName: "aris",
                });
                newUser.save(done);
            }
        })
        .catch(done);
};

const socialNetworkStrategy = (token: string, refreshTocken: any, profile: any, done: any) =>
    process.nextTick(socialAppsRegisterCallback(profile, token, refreshTocken, done));

const setSocialAuth = (provider: string) =>
    passport.authenticate(provider, {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        scope: ["email", "profile", "openid"],
    }); // handling fail with router

const createSocialNetworkRoutes = (app: Application) => {
    const socialNetworks = ["google", "bitbucket"];
    socialNetworks.forEach((provider) => {
        // register middlewares
        app.get(`/auth/${provider}`, setSocialAuth(provider));
        app.get(`/auth/${provider}/callback`, setSocialAuth(provider));
    });
};

export { serialize, deserialize, socialNetworkStrategy, localStrategyHandler, createSocialNetworkRoutes };
