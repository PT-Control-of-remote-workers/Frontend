import React from 'react'
import {Route} from 'react-router-dom'
import Main from "./component/main_page/Main";
import SignUpPage from "./component/sign_page/SignUpPage";
import {cookies} from "./utils/cookiesUtils";

export default function App() {
    function checkCookie() {
        return cookies.get('accessToken');
    }

    return (
        <>
            <Route
                path={'/main'}
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
            {checkCookie() &&
            <Route
                path={'/'}
                render={() => (
                    <Main/>
                )}
            />
            }
            {!checkCookie() &&
            <Route
                path={'/'}
                render={() => (
                    <SignUpPage/>
                )}
            />
            }
        </>
    )
}
