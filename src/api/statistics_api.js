import {callsRequest} from './api'

export function taskCalls(periodCalls, accessToken) {
    return callsRequest
        .post('/api/v1/task-calls', periodCalls, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function teamCalls(periodCalls, accessToken) {
    return callsRequest
        .post('/api/v1/team-calls', periodCalls, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function workerCalls(periodCalls, accessToken) {
    return callsRequest
        .post('/api/v1/worker-calls', periodCalls, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}