import { Strategy } from "passport-google-oauth20";
import { socialNetworkStrategy } from "./utils";

export default new Strategy(
    {
        clientID: "813573427784-u6okgh1ituqakgv729uvuftpdmm38hs5.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "qYhchpZVxQqkr2y6aqfO8_-6",
        callbackURL: "/auth/google/callback",
    },
    socialNetworkStrategy
);
