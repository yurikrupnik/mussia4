// import { Strategy } from 'passport-remember-me';
// import crypto from 'crypto';
import { serialize, deserialize } from './utils';
import localStrategy from './local';

export default (passport:any) => {
    passport.serializeUser(serialize);
    passport.deserializeUser(deserialize);
    passport.use(localStrategy);

    // passport.use(
    //     new Strategy(
    //         (token, done) => {
    //             console.log('Strategy token', token);
    //             // Token.consume(token, (err, user) => {
    //             //     if (err) { return done(err); }
    //             //     if (!user) { return done(null, false); }
    //             //     return done(null, user);
    //             // });
    //             done(null, null, {});
    //         },
    //         (user, done) => {
    //             const token = crypto.randomBytes(64).toString('hex'); // eslint-disable-line
    //             // Token.save(token, { userId: user.id }, (err) => {
    //             //     if (err) { return done(err); }
    //             //     return done(null, token);
    //             // });
    //             done(null, null, {});
    //         }
    //     )
    // );
};
