import {callsRequest} from './api'
import {getMessageFromError} from "../utils/errorHandler";

export function taskCalls(periodCalls, accessToken) {
    return callsRequest
        .post('/api/v1/task-calls', periodCalls, {
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

export function teamCalls(periodCalls, accessToken) {
    return callsRequest
        .post('/api/v1/team-calls', periodCalls, {
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

export function workerCalls(periodCalls, accessToken) {
    return callsRequest
        .post('/api/v1/worker-calls', periodCalls, {
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

export function workerTaskCalls(periodCalls, accessToken) {
    return callsRequest
        .post('/api/v1/worker-task-calls', periodCalls, {
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