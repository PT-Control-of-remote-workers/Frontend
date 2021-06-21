import {workManagerRequest} from './api'

export function createTask(task, accessToken) {
    return workManagerRequest
        .post('/api/v1/task', task, {
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

export function updateTask(task, accessToken) {
    return workManagerRequest
        .put('/api/v1/task', task, {
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

export function getTask(taskId, accessToken) {
    return workManagerRequest
        .get(`/api/v1/tasks/${taskId}`, {
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

export function getTasksOfTeamAndWorker(teamAndUser, accessToken) {
    return workManagerRequest
        .post('/api/v1/task/getByWorkerAndTeam', {
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

export function setWorker(taskAndWorker, accessToken) {
    return workManagerRequest
        .put('/api/v1/task/setWorker', taskAndWorker, {
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

export function importTrello(trello, accessToken) {
    return workManagerRequest
        .post('/api/v1/task/trello', trello, {
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

export function removeTask(taskId, accessToken) {
    return workManagerRequest
        .delete(`/api/v1/tasks/${taskId}`, {
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

export function closeTask(taskId, accessToken) {
    return workManagerRequest
        .put(`/api/v1/tasks/${taskId}/close`, '', {
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

export function completeTask(taskId, accessToken) {
    return workManagerRequest
        .put(`/api/v1/tasks/${taskId}/complete`, '', {
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

export function resumeTask(taskId, accessToken) {
    return workManagerRequest
        .put(`/api/v1/tasks/${taskId}/resume`, '', {
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

export function tasksOfWorker(workerId, accessToken) {
    return workManagerRequest
        .post(`/api/v1/tasks/workers/${workerId}`, '', {
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
