import { userRequest } from './api'
import {getMessageFromError} from "../utils/errorHandler";

export function getUsersInGroup(group,accessToken) {
    return userRequest
        .get(`/api/v1/admin/users-in-group?groupName=${group}`,{ headers: {
                withCredentials: true,
                'Authorization': `Bearer ${accessToken}`
            }})
        .then(res => res.data)
        .catch(err => {
            const msg = getMessageFromError(err)
            throw new Error(msg)
        })
}

export function disable(username,accessToken) {
    return userRequest
        .put(`/api/v1/admin/disable-user?username=${username}`,'',{ headers: {
                withCredentials: true,
                'Authorization': `Bearer ${accessToken}`
            }})
        .then(res => res.data)
        .catch(err => {
            const msg = getMessageFromError(err)
            throw new Error(msg)
        })
}
export function enable(username,accessToken) {
    return userRequest
        .put(`/api/v1/admin/enable-user?username=${username}`,'',{ headers: {
                withCredentials: true,
                'Authorization': `Bearer ${accessToken}`
            }})
        .then(res => res.data)
        .catch(err => {
            const msg = getMessageFromError(err)
            throw new Error(msg)
        })
}

export function addUserToGroup(username,group,accessToken) {
    return userRequest
        .put(`/api/v1/admin/grant-authority?username=${username}&groupName=${group}`,'',{ headers: {
                withCredentials: true,
                'Authorization': `Bearer ${accessToken}`
            }})
        .then(res => res.data)
        .catch(err => {
            const msg = getMessageFromError(err)
            throw new Error(msg)
        })
}

export function removeUserFromGroup(username,group,accessToken) {
    return userRequest
        .delete(`/api/v1/admin/grant-authority?username=${username}&groupName=${group}`,{ headers: {
                withCredentials: true,
                'Authorization': `Bearer ${accessToken}`
            }})
        .then(res => res.data)
        .catch(err => {
            const msg = getMessageFromError(err)
            throw new Error(msg)
        })
}