import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { grommet } from 'grommet/themes';
import {Grommet} from 'grommet'
import {store} from "./redux/store";

const theme = {
    ...grommet,
    global: {
        ...grommet.global,
        colors: {
            header: "#4FAEB4",
            menu: "#3E3E3E",
            back: "#E5E5E5",
            action: "#09CF83",
            create: "#11D600",
            remove: "#F30000",
            update: "#FFDA18",
            focus: "#4FAEB4",
            details: "#6F4BFF",
            footer: "#333333",
            white: "#ffffff"
        },
    },
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Grommet full theme={theme}>
                    <App/>
                </Grommet>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);
