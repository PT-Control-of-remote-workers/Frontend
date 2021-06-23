import React from 'react'
import {Route, Switch, Router, Redirect} from 'react-router-dom'
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
                exact={true}
                render={() => (
                    <SignUpPage/>
                )}
            />
            {
                checkCookie() &&
                    <Route
                        path={'/'}
                        exact={true}
                        redire
                        render={() => (
                            <Redirect to="/main"/>
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
