import express from "express";
import { StaticRouter } from "react-router-dom"; // matchPath
import { renderToString } from "react-dom/server";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { ChunkExtractor } from "@loadable/server";
import React from "react";
import path from "path";
import { Routes, Theme } from "../types";

interface Props {
    theme: Theme;
    routes: Routes;
}

const render = (App: React.FC<Props> | null, routes: Routes, fileLocation: string) => {
    const statsFile = path.join(fileLocation, "loadable-stats.json");
    console.log("statsFile", statsFile);
    // const extractor = new ChunkExtractor({ statsFile });
    const route = express.Router();
    route.get("/*", (req, response, next) => {
        console.log("At render req.url", req.url); // eslint-disable-line
        if (!App) {
            return response.render("index.ejs", {
                title: "",
                html: "",
                appData: {},
                tags: "",
                links: "",
            });
        }

        // const activeRoute = routes.find((r) => matchPath(req.url, r)) || {
        //     fetchInitialData: (url: string) => Promise.resolve([]),
        // };
        // const promise = activeRoute.aris ? activeRoute.aris(req.url) : Promise.resolve([]);
        const promise = Promise.resolve([]);
        return promise
            .then((res: any) => {
                console.log("res", res);
                // let appData = {};
                // if (res.length && Array.isArray(activeRoute.providers)) {
                //     appData = activeRoute.providers.reduce((acc, nextProvider, i) => {
                //         acc[nextProvider] = Array.isArray(res[0]) ? res[i] : res;
                //         return acc;
                //     }, appData);
                // }
                const context = {
                    url: "",
                };
                const title = "my title";
                const html = renderToString(
                    <StaticRouter location={req.url} context={{}}>
                        <App theme={{}} routes={routes} />
                    </StaticRouter>
                );
                // const html = renderToString(
                //     extractor.collectChunks(
                //         <StaticRouter location={req.url} context={{}}>
                //             <App routes={routes} theme={{}} />
                //         </StaticRouter>
                //     )
                // );
                // const tags = extractor.getScriptTags();
                console.log("html", html.length);
                // const links = extractor.getLinkTags();
                const state = {
                    title,
                    html,
                    // appData,
                    tags: "",
                    links: "",
                };
                console.log("state", state); // eslint-disable-line
                return context.url ? response.redirect(301, context.url) : response.render("index.ejs", state);
            })
            .catch((err: Error) => {
                console.log("err", err.stack); // eslint-disable-line no-console
                return next(err);
            });
    });
    return route;
};

export default render;
