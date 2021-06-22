import {workManagerRequest} from './api'

export function createTeam(team, accessToken) {
    return workManagerRequest
        .post('/api/v1/teams', team, {
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

export function getTeam(teamId, accessToken) {
    return workManagerRequest
        .get(`/api/v1/teams/${teamId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function getTeams(workerId, accessToken) {
    return workManagerRequest
        .post(`/api/v1/teams/workers/${workerId}`, '', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function addLeaderToTeam(teamAndUser, accessToken) {
    return workManagerRequest
        .put('/api/v1/teams/add-leaders', teamAndUser, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function addWorkerToTeam(teamAndUser, accessToken) {
    return workManagerRequest
        .put('/api/v1/teams/add-workers', teamAndUser, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function removeLeaderToTeam(teamAndUser, accessToken) {
    return workManagerRequest
        .put('/api/v1/teams/remove-leaders', teamAndUser, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function removeWorkerToTeam(teamAndUser, accessToken) {
    return workManagerRequest
        .put('/api/v1/teams/remove-workers', teamAndUser, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function setAdmin(teamAndUser, accessToken) {
    return workManagerRequest
        .put('/api/v1/teams/set-admin', teamAndUser, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function removeTeam(teamId, accessToken) {
    return workManagerRequest
        .delete(`/api/v1/teams/${teamId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => res.data)
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}
