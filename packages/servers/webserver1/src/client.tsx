import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { loadableReady } from "@loadable/component";
import { render, hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import { ReactQueryDevtools } from "react-query-devtools";
import App from "./components/App";
import routes from "./routes";
import { isProd } from "./config";
import { Theme } from "./types";
import "./styles/_index.scss";

const theme: Theme = {
    palette: {
        primary: {
            main: "#50abdc",
        },
        // special: {
        //   main: "rgba(27,85,69,0.44)",
        //   dark: "#393628",
        //   light: "#393628",
        //   contrastText: "#393628",
        // },
        // shit: {
        //     main: '#b43fdc'
        // }
    },
};

if (!isProd) {
    render(
        <BrowserRouter>
            <App routes={routes} theme={theme} />
        </BrowserRouter>,
        document.getElementById("root")
    );
} else {
    loadableReady(() => {
        hydrate(
            <BrowserRouter>
                <App routes={routes} theme={theme} />
            </BrowserRouter>,
            global.document.getElementById("root")
        );
    });
}
