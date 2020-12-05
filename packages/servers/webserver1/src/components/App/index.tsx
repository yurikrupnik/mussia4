import React from "react";
// import PropTypes from 'prop-types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ReactQueryConfigProvider } from "react-query";
// import purple from "@material-ui/core/colors/purple";
// import green from "@material-ui/core/colors/green";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import { Route } from "react-router-dom";
// import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// import { ThemeOptions } from "@material-ui/core/styles";
// import useTheme from "@material-ui/core/styles/useTheme";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import Router from '../Router';
// import { Provider as UsersProvider } from "../../api/users/context";
// import providers from "../../api/providers";
// import Providers from "./providers";
// import Login from "../Login";
// import Providers from '';
// import Layout from './layout';
import { Theme, Routes } from "../../types";
import "./style.sass";

interface Props {
    theme: Theme;
    routes: Routes;
}

const queryConfig = {
    // suspense: true,
    // throwOnError: true,
    // refetchOnWindowFocus: false,
};

// const theme = createMuiTheme({
//     palette: {
//         primary: purple,
//         secondary: green,
//     },
//     status: {
//         danger: "orange",
//     },
// });

const App: React.FC<Props> = ({ theme, routes }) => (
    <ReactQueryConfigProvider config={queryConfig}>
        <ThemeProvider theme={createMuiTheme(theme)}>
                {routes.map((route) => (
                    <Route
                    strict={route.strict}
                    sensitive={route.sensitive}
                    exact={route.exact}
                    key={route.key}
                    path={route.path}
                    component={route.component}
                    />
            ))}
        </ThemeProvider>
    </ReactQueryConfigProvider>
);

// App.defaultProps = {
//     providers: [],
//     theme: {}

// };
//
// App.propTypes = {
//     routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
//     providers: PropTypes.arrayOf(PropTypes.func),
//     theme: PropTypes.shape({})
// };

export default App;
