import {auth, register, getUser, logout} from '../../api/user_api'
import {Cookies} from 'react-cookie'
import {setTokensCookies, deleteTokensCookies} from '../../utils/cookiesUtils'

const SET_USER_DATA = 'SET_USER_DATA'

const defaultState = {

    // Данные авторизированного пользователя
    userData: null
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_USER_DATA): {
            return {
                ...state,
                userData: action.userData
            }
        }
        default: {
            return state
        }
    }
}

export function setUserDataAC(userData) {
    if(userData) {
        userData.userAttributes = userData.userAttributes.reduce((acc, att) => {
            acc[att.name] = att.value
            return acc
        })
    }
    return {
        type: SET_USER_DATA,
        userData
    }
}

export function regUser(userData) {
    return async dispatch => {
        try {
            const validUserData = {
                username: userData.username,
                password: userData.password,
                userAttributes: [
                    {
                        name: "name",
                        value: userData.firstName
                    },
                    {
                        name: "family_name",
                        value: userData.lastName
                    },
                    {
                        name: "email",
                        value: userData.email
                    }
                ]
            }
            const result = await register(validUserData)
            if (!result) {
                throw new Error('Registration failed. Try again later')
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function authUser(userReg) {
    return async dispatch => {
        try {
            const result = await auth(userReg)
            setTokensCookies(
                result.accessToken,
                result.accessTokenTimeout,
                result.refreshTokenTimeout,
                userReg.username
            )
            let user = await getUser(userReg.username)
            dispatch(setUserDataAC(user))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function userLogout() {
    return async dispatch => {
        try {
            const cookies = new Cookies()
            await logout(cookies.get('accessToken'))

            deleteTokensCookies()
            dispatch(setUserDataAC(null))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}



