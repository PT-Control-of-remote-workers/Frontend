import {workManagerRequest} from './api'

export function createTeam(team, accessToken) {
    return workManagerRequest
        .post('/api/v1/team', team, {
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

export function updateTeam(teamUpdate, accessToken) {
    return workManagerRequest
        .put('/api/v1/team', teamUpdate, {
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
        .put('/api/v1/team/add-leader', teamAndUser, {
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
        .put('/api/v1/team/add-worker', teamAndUser, {
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
        .put('/api/v1/team/remove-leader', teamAndUser, {
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
        .put('/api/v1/team/remove-worker', teamAndUser, {
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
        .put('/api/v1/team/set-admin', teamAndUser, {
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
