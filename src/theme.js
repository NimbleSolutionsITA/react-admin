import { defaultTheme } from "react-admin";
import {createTheme} from "@material-ui/core";
import merge from "lodash/merge";

export const theme = createTheme(
    merge({}, defaultTheme, {
        palette: {
            // Your theme goes here
            // Write the following code to have an orange app bar. We'll explain it later in this article.
            primary: {
                main: '#40774a'
            },
            secondary: {
                main: "#40774a", // Not far from orange
            },
        }
    })
);