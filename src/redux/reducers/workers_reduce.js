import {cookies} from '../../utils/cookiesUtils'
import {
    addLeaderToTeam, addWorkerToTeam,
    getTeam,
    removeLeaderToTeam,
    removeWorkerToTeam,
    setAdmin,
    updateTeam
} from "../../api/teams_api";
import {getUser} from "../../api/user_api";
import {selectSimpleTeam, selectTeam} from "../selectors/selectors";

const SET_WORKERS = 'WORKERS_SET'
const REMOVE_WORKER = 'WORKERS_REMOVE'
const UPDATE_LEADER = 'WORKERS_UPDATE_LEADER'
const UPDATE_ADMIN = 'WORKERS_UPDATE_ADMIN'
const ADD_WORKER = 'WORKERS_ADD_WORKER'
const SET_SIMPLE = 'WORKERS_SET_SIMPLE'
const CLEAR = "WORKERS_CLEAR"
const UPDATE_TEAM = "WORKERS_UPDATE_TEAM"

const defaultState = {
    team: null,
    simpleTeam: null
}

export function workersReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_WORKERS): {
            const newState = {
                team: action.team,
                simpleTeam: action.simpleTeam
            }
            return {
                ...state,
                ...newState
            }
        }
        case(REMOVE_WORKER): {
            const newState = {}
            newState.team = {...state.team}
            newState.team.workers = {...state.team.workers}
            delete newState.team.workers[action.username]
            newState.simpleTeam = action.team
            return {
                ...state,
                ...newState
            }
        }
        case (UPDATE_ADMIN): {
            const newState = {}
            newState.team = {...state.team}
            newState.team.admin = action.team.admin
            newState.simpleTeam = {...state.simpleTeam}
            newState.simpleTeam.admin = action.team.admin
            return {
                ...state,
                ...newState
            }
        }
        case (UPDATE_LEADER): {
            const newState = {}
            newState.team = {...state.team}
            newState.team.leaders = action.team.leaders
            newState.simpleTeam = {...state.simpleTeam}
            newState.simpleTeam.leaders = action.team.leaders
            return {
                ...state,
                ...newState
            }
        }
        case (ADD_WORKER): {
            const worker = action.worker
            return {
                ...state,
                team: {
                    ...state.team,
                    workers: {
                        ...state.team.workers,
                        [worker.username]: worker
                    }
                }
            }
        }
        case (SET_SIMPLE): {
            const newState = {}
            newState.simpleTeam = action.team
            return {
                ...state,
                ...newState
            }
        }
        case (UPDATE_TEAM): {
            const newState = {...state}
            newState.simpleTeam = action.team
            delete action.team['workers']
            newState.team = {
                ...state.team,
                ...action.team
            }
            return ({
                ...state,
                ...newState
            })
        }
        case (CLEAR): {
            const newState = {...state}
            newState.simpleTeam = null
            newState.team = null
            return {
                ...state,
                ...newState
            }
        }
        default: {
            return state
        }
    }
}

function addWorkerAC(worker, team) {
    return {
        type: ADD_WORKER,
        worker: worker,
        team: team
    }
}

function removeWorkerAC(workerId, team) {
    return {
        type: REMOVE_WORKER,
        username: workerId,
        team: team
    }
}

function setWorkersAC(team, simpleTeam) {
    return {
        type: SET_WORKERS,
        team: team,
        simpleTeam: simpleTeam
    }
}

function updateAdminAC(team) {
    return {
        type: UPDATE_ADMIN,
        team: team
    }
}

function updateLeaderAC(team) {
    return {
        type: UPDATE_LEADER,
        team: team
    }
}

export function setSimpleTeamAC(team) {
    return {
        type: SET_SIMPLE,
        team: team
    }
}

export function clearTeamAC() {
    return {
        type: CLEAR
    }
}

function updateTeamAC(team) {
    return {
        type: UPDATE_TEAM,
        team: team
    }
}

async function convertWorker(workerId) {
    const user = await getUser(workerId);
    return {
        ...user,
        ...user.userAttributes.reduce((acc, att) => {
            acc[att.name] = att.value
            return acc
        })
    }
}

export function addWorker(workerId) {
    return async (dispatch, getState) => {
        try {
            const teamId = selectTeam(getState()).id
            const team = await addWorkerToTeam({
                id: teamId,
                userId: workerId
            }, cookies.get('accessToken'))
            dispatch(addWorkerAC(await convertWorker(workerId), team))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function loadWorkersFromState() {
    return async (dispatch, getState) => {
        try {
            const team = selectTeam(getState())
            const simpleTeam = {...team}
            const fullWorkers = {}
            for (let i = 0; i < team.workers.length; i++) {
                let worker = team.workers[i]
                fullWorkers[worker] = await convertWorker(worker)
            }
            team.workers = fullWorkers
            dispatch(setWorkersAC(team, simpleTeam))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function updateTeamOnServ(team) {
    return async (dispatch, getState) => {
        try {
            const response = await updateTeam(team, cookies.get('accessToken'))
            dispatch(updateTeamAC(response))
            const selectedTeam = selectSimpleTeam(getState())
            if (selectedTeam && selectedTeam.id === team.id) {
                dispatch(setSimpleTeamAC(team))
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function loadWorkersFromServ(teamId) {
    return async (dispatch, getState) => {
        try {
            const team = await getTeam(teamId, cookies.get('accessToken'))
            const simpleTeam = {...team}
            const fullWorkers = {}
            for (let i = 0; i < team.workers.length; i++) {
                let worker = team.workers[i]
                fullWorkers[worker] = await convertWorker(worker)
            }
            team.workers = fullWorkers
            dispatch(setWorkersAC(team, simpleTeam))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function makeLeaderWorker(teamAndWorker) {
    return async (dispatch, getState) => {
        try {
            const team = await addLeaderToTeam(teamAndWorker, cookies.get('accessToken'))
            dispatch(updateLeaderAC(team))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function setAdminTeam(teamAndWorker) {
    return async (dispatch, getState) => {
        try {
            const team = await setAdmin(teamAndWorker, cookies.get('accessToken'))
            dispatch(updateAdminAC(team))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function removeLeaderTeam(teamAndWorker) {
    return async (dispatch, getState) => {
        try {
            const team = await removeLeaderToTeam(teamAndWorker, cookies.get('accessToken'))
            dispatch(updateLeaderAC(team))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function removeWorkerFromTeam(teamAndWorker) {
    return async (dispatch, getState) => {
        try {
            const team = await removeWorkerToTeam(teamAndWorker, cookies.get('accessToken'))
            dispatch(removeWorkerAC(teamAndWorker.userId, team))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}