import React, { useState } from "react";
// import PropTypes from "prop-types";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/core";

import { Theme } from "../../types";

// const Context = createContext({
//     theme: createMuiTheme({}),
// });

interface Props {
    defaultTheme: Theme;
}

const Theme: React.FC<Props> = (props) => {
    const { defaultTheme } = props;
    console.log("defaultTheme", defaultTheme);
    const [theme] = useState(createMuiTheme(defaultTheme));
    // const overrideTheme = useCallback(
    //     (obj) => {
    //         setThemeLocal(
    //             createMuiTheme({
    //                 ...theme,
    //                 ...obj,
    //             })
    //         );
    //     },
    //     [theme]
    // );
    const { children } = props;

    // const setTheme = useCallback((obj) => {
    //     setThemeLocal(createMuiTheme(obj));
    // }, []);

    // const [data, setData] = useState([]);
    // const getById = useCallback(api.getById, []); // eslint-disable-line

    // useEffect(() => {
    //     // get theme by id
    //     // getById('5e695f00f3745852b50f26aa')
    //     //     .then((res) => {
    //     //         setTheme(createMuiTheme(res));
    //     //     });
    // }, []);

    // const put = useCallback((body) => api.put(body).then((a) => setTheme(createMuiTheme(a))), []);

    // console.log('theme', theme);
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// Theme.propTypes = {};

export default Theme;
