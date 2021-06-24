export function selectTeamOfWorkers(state) {
    return state.workers.team
}

export function selectTeam(state) {
    return state.team.team
}

export function selectSimpleTeam(state) {
    return state.team.simpleTeam
}

export function selectTeams(state) {
    return state.teams.teams
}

export function selectTeamCalls(state) {
    return state.teamCalls.calls
}

export function selectTeamStatistics(state) {
    return state.teamCalls.statistics
}

export function selectTaskCalls(state) {
    return state.taskCalls.calls
}

export function selectTaskStatistic(state) {
    return state.taskCalls.statistic
}

export function selectTaskFromStatistic(state) {
    return state.taskCalls.task
}

export function selectTeamFromStatistic(state) {
    return state.taskCalls.team
}

export function selectWorkersFromStatistic(state) {
    return state.taskCalls.workers
}

export function selectWorkerTaskCalls(state) {
    return state.workerTaskCalls.calls
}

export function selectUserData(state) {
    return state.user.userData
}

export function selectTasksOfTeam(state) {
    return state.tasks.tasks
}

export function selectWorkerTasks(state) {
    return state.workerTasks.tasks
}