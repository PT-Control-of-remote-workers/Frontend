import {Cookies} from 'react-cookie'
import {refreshAccess} from '../api/user_api'

export const cookies = new Cookies()

export async function refreshTokensCookies() {
    if (!cookies.get('refreshTokenTimeout')) {
        deleteTokensCookies()
        return false
    } else if (!cookies.get('accessToken')) {
        try {
            const res = await refreshAccess()
            setTokensCookies(
                res.accessToken,
                res.accessTokenTimeout,
                res.refreshTokenTimeout
            )
        } catch (err) {
            deleteTokensCookies()
            console.log(err)
            return false
        }
    }
    return true
}

export function setTokensCookies(access, accessTimeout, refreshTimeout, username) {
    if (access && refreshTimeout && accessTimeout) {
        cookies.set(
            'accessToken',
            access,
            {
                expires: new Date(Date.now() + accessTimeout * 1000)
            }
        )
        cookies.set(
            'refreshTokenTimeout',
            refreshTimeout,
            {
                expires: new Date(Date.now() + refreshTimeout * 1000)
            }
        )
        if(username) {
            cookies.set(
                'username',
                username
            )
        }
    } else {
        throw new Error('Authorization error. Please try it again later')
    }
}

export function deleteTokensCookies() {
    cookies.remove('accessToken')
    cookies.remove('refreshTokenTimeout')
    cookies.remove('username')
}

export function getUsernameFromCookie() {
    return cookies.get('username')
}