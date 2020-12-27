import { Strategy } from "passport-google-oauth20";
import { socialNetworkStrategy } from "./utils";

export default new Strategy(
    {
        clientID: "813573427784-u6okgh1ituqakgv729uvuftpdmm38hs5.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "KyxjO9p4yA4xhz8UVpIxyu82",
        callbackURL: "/auth/google/callback",
    },
    socialNetworkStrategy
);
