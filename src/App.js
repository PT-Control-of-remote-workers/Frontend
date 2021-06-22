import React from 'react'
import {Route, Switch, Router} from 'react-router-dom'
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
                exact={true}
                render={() => (
                    <Main/>
                )}
            />
            <Route
                path={'/sign_page'}
                exact={true}
                render={() => (
                    <SignUpPage/>
                )}
            />
            {checkCookie() &&
            <Route
                path={'/'}
                exact={true}
                render={() => (
                    <Main/>
                )}
            />
            }
            {!checkCookie() &&
            <Route
                path={'/'}
                exact={true}
                render={() => (
                    <SignUpPage/>
                )}
            />
            }
        </>
    )
}
