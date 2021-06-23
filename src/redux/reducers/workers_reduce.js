import {Cookies} from 'react-cookie'
import {addLeaderToTeam, removeLeaderToTeam, removeWorkerToTeam, setAdmin} from "../../api/teams_api";
import {getUser} from "../../api/user_api";
import {selectTeam} from "../selectors/selectors";

const SET_WORKERS = 'WORKERS_SET'
const REMOVE_WORKER = 'WORKERS_REMOVE'
const UPDATE_LEADER = 'WORKERS_UPDATE_LEADER'
const UPDATE_ADMIN = 'WORKERS_UPDATE_ADMIN'
const ADD_WORKER = 'WORKERS_ADD_WORKER'
const SET_SIMPLE = 'WORKERS_SET_SIMPLE'
const CLEAR = "WORKERS_CLEAR"

const defaultState = {
    team: null,
    simpleTeam: null
}

export function workersReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_WORKERS): {
            const newState = {
                team: action.team
            }
            return {
                ...state,
                ...newState
            }
        }
        case(REMOVE_WORKER): {
            const newState = {}
            newState.team = {...state.team}
            delete newState.workers[action.username]
            return {
                ...state,
                ...newState
            }
        }
        case (UPDATE_ADMIN): {
            const newState = {...state}
            newState.team.admin = action.team.admin
            return {
                ...state,
                ...newState
            }
        }
        case (UPDATE_LEADER): {
            const newState = {...state}
            newState.team.leaders = action.team.leaders
            return {
                ...state,
                ...newState
            }
        }
        case (ADD_WORKER): {
            const newState = {...state}
            const worker = action.worker
            newState.team.workers[worker.username] = worker
            return {
                ...state,
                ...newState
            }
        }
        case (SET_SIMPLE): {
            debugger
            const newState = {...state}
            newState.simpleTeam = action.team
            const example = {
                ...state,
                ...newState
            }
            return {
                ...state,
                ...newState
            }
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

function addWorkerAC(worker) {
    return {
        type: ADD_WORKER,
        worker: worker
    }
}

function removeWorkerAC(workerId) {
    return {
        type: REMOVE_WORKER,
        key: workerId
    }
}

function setWorkersAC(team) {
    return {
        type: SET_WORKERS,
        team: team
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

function convertWorker(workerId, team) {
    let role = 'WORKER';
    if (workerId in team.leaders) {
        role = 'LEADER'
    }
    if (workerId === team.admin) {
        role = 'ADMIN'
    }
    const user = getUser(workerId);
    return {
        ...user,
        ...user.userAttributes.reduce((acc, att) => {
            acc[att.name] = att.value
            return acc
        }),
        role: role
    }
}

export function addWorker(workerId) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const team = selectTeam(getState())
            await addWorker({
                id: team.id,
                username: workerId
            })
            dispatch(addWorkerAC(convertWorker(workerId, team)))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function loadWorkersFromServ(teamId) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const team = selectTeam(getState())
            const workers = team.workers.reduce((sum, act) => {
                sum[act] = convertWorker(act, team)
                return sum
            })
            team.workers = workers
            dispatch(setWorkersAC(team))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function makeLeaderWorker(teamAndWorker) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const team = await addLeaderToTeam(teamAndWorker, cookies.get('accessToken'))
            dispatch(updateLeaderAC(team))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function setAdminTeam(teamAndWorker) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const team = await setAdmin(teamAndWorker, cookies.get('accessToken'))
            dispatch(updateAdminAC(team))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function removeLeaderTeam(teamAndWorker) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const team = await removeLeaderToTeam(teamAndWorker, cookies.get('accessToken'))
            dispatch(updateAdminAC(team))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function removeWorkerFromTeam(teamAndWorker) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            await removeWorkerToTeam(teamAndWorker, cookies.get('accessToken'))
            dispatch(removeWorkerAC(teamAndWorker.id))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}