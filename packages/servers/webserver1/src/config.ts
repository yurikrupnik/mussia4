/* this file is used in webpack client for dev port and proxy host */
import json from "../package.json";

const port = Number(process.env.PORT) || json.config.port || 8080;
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const isProd = process.env.NODE_ENV === "production";
// const isProd = process.env.NODE_ENV === "production";
const baseURL = "/api";
// const baseURL = `http://${isProd ? '0.0.0.0' : 'localhost'}:${isProd || process.env.DEBUG ? port : port + 1}/api`;

function handleDatabaseUrl() {
    // console.log("process.env.DATABASE_URL", process.env.DB_URL);
    // console.log("process.env.DATABASE_PASSWORD", process.env.DB_PASSWORD);
    // console.log("process.env.DB_USER", process.env.DB_USER);
    const url = process.env.DB_URL;
    if (!url) {
        return "mongodb://localhost/mussia4";
        // return "mongodb://db/mussia4";
    }

    // const isMlab = url.includes("mlab");

    return url.includes("cluster") ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${url}` : url;
}

const databaseUrl = handleDatabaseUrl();
console.log("databaseUrl", databaseUrl);
// console.log("port", port);
console.log("isProd", isProd);
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("process.env.PORT", process.env.PORT);
console.log("process.env.DB_PASSWORD", process.env.DB_PASSWORD);
console.log("port", port);

// module.exports = {
//     port,
//     databaseUrl,
//     baseURL,
//     isProd,
// };

export { port, databaseUrl, baseURL, isProd };
// module.exports = { port, databaseUrl, baseURL, isProd };
