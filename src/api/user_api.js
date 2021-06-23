import { userRequest } from './api'
import {getMessageFromError} from "../utils/errorHandler";

export function register(userData) {
    const formData = new FormData()
    formData.append('user', JSON.stringify(userData))
    return userRequest
        .post('/api/v1/registration', formData)
        .catch(err => {
            const msg = getMessageFromError(err)
            throw new Error(msg)
        })
}

export function auth(formData) {
    return userRequest
        .post('/api/v1/auth/login', formData)
        .then(res => res.data)
        .catch(err => {
            const msg = getMessageFromError(err)
            throw new Error(msg)
        })
}

export function refreshAccess() {
    return userRequest
        .get('/api/v1/auth/refresh-token', {
            withCredentials: true
        })
        .then(res => res.data)
        .catch(err => {
            const msg = getMessageFromError(err)
            throw new Error(msg)
        })
}

export function getUser(username) {
    return userRequest
        .get(`/api/v1/users/${username}`)
        .then(res => res.data)
        .catch(err => {
            const msg = getMessageFromError(err)
            throw new Error(msg)
        })
}

export function logout(accessToken) {
    return userRequest
        .get('/api/v1/auth/logout', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            const msg = getMessageFromError(err)
            throw new Error(msg)
        })
}