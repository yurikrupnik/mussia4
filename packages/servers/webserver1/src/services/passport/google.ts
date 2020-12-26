import { Strategy } from "passport-google-oauth20";
import { socialNetworkStrategy } from "./utils";

console.log("process.env.GOOGLE_CLIENT_SECRET", process.env.GOOGLE_CLIENT_SECRET);

export default new Strategy(
    {
        // clientID: process.env.GOOGLE_CLIENT_ID,
        clientID: "813573427784-u6okgh1ituqakgv729uvuftpdmm38hs5.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        callbackURL: "/auth/google/callback",
    },
    socialNetworkStrategy
);
