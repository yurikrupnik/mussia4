/* this file is used in webpack client for dev port and proxy host */
import json from "../package.json";

const port = Number(process.env.PORT) || json.config.port || 8080;
const isProd = process.env.NODE_ENV === "production";
const baseURL = "/api";
// const baseURL = `http://${isProd ? '0.0.0.0' : 'localhost'}:${isProd || process.env.DEBUG ? port : port + 1}/api`;

console.log("port", port);

function handleDatabaseUrl() {
    const url = process.env.DATABASE_URL;
    if (!url) {
        return "mongodb://localhost/rt-react";
    }

    const isMlab = url.includes("mlab");

    return url.includes("gcp.mongodb") || isMlab
        ? `mongodb${!isMlab ? "+srv" : ""}://${process.env.DB_USER}:${process.env.DB_PASSWORD}${url}`
        : url;
}

const databaseUrl = handleDatabaseUrl();

export { port, databaseUrl, baseURL, isProd };
// module.exports = { port, databaseUrl, baseURL, isProd };
