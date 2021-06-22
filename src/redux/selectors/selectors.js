export function selectTeamOfWorkers(state) {
    return state.workers.team
}

export function selectTeam(state) {
    return state.team.team
}

export function selectTeams(state) {
    return state.teams.teams
}

export function selectTeamCalls(state) {
    return state.teamCalls.calls
}

export function selectTeamStatistics(state) {
    return state.teamCalls.teamCalls.statistics
}

export function selectTaskCalls(state) {
    return state.taskCalls.teamCalls.calls
}

export function selectTaskStatistic(state) {
    return state.taskCalls.teamCalls.statistic
}

export function selectUserData(state) {
    console.log(state)
    return state.user.userData
}

export function selectTasksOfTeam(state) {
    return state.tasks.tasks
}