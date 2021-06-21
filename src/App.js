import React from 'react'
import {Route} from 'react-router-dom'
import Main from "./component/main_page/Main";
import SignUpPage from "./component/sign_page/SignUpPage";

export default function App() {
    return (
        <>
            {}
            <Route
                path={'/index'}
                render={() => (
                    <Main/>
                )}
            />
            <Route
                path={'/sign_page'}
                render={() => (
                    <SignUpPage/>
                )}
            />
        </>
    )
}
