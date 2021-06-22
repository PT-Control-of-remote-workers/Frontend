import {Cookies} from 'react-cookie'
import {addLeaderToTeam, getTeam, removeLeaderToTeam, removeWorkerToTeam, setAdmin} from "../../api/teams_api";
import {getUser} from "../../api/user_api";
import {selectTeam} from "../selectors/selectors";

const SET_WORKERS = 'WORKERS_SET'
const REMOVE_WORKER = 'WORKERS_REMOVE'
const UPDATE_WORKER = 'WORKERS_UPDATE'

const defaultState = {
    team: null
}

export function workersReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_WORKERS): {
            return {
                ...state,
                team: {
                    ...state.team,
                    workers: action.workers
                }
            }
        }
        case(REMOVE_WORKER): {
            const newState = {}
            newState.workers = {...state.workers}
            delete newState.workers[action.username]
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

function removeWorkerAC(workerId) {
    return {
        type: REMOVE_WORKER,
        key: workerId
    }
}

function setWorkersAC(workers) {
    if (workers.length !== 0) {
        workers = workers.reduce((sum = {}, act) => {
            sum[act.username] = act
            return sum;
        })
    } else {
        workers = {}
    }
    return {
        type: SET_WORKERS,
        workers: workers
    }
}

function updateWorkerAC(worker) {
    return {
        type: UPDATE_WORKER,
        workers: worker
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

export function loadWorkersFromServ(teamId) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const team = selectTeam(getState())
            const workers = team.workers.reduce((sum, act) => {
                sum[act] = convertWorker(act, team)
                return sum
            })
            dispatch(setWorkersAC(workers))
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
            await addLeaderToTeam(teamAndWorker, cookies.get('accessToken'))
            const user = convertWorker(teamAndWorker.userId, selectTeam(getState()))
            dispatch(updateWorkerAC(user))
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
            await setAdmin(teamAndWorker, cookies.get('accessToken'))
            const user = convertWorker(teamAndWorker.userId, selectTeam(getState()))
            dispatch(updateWorkerAC(user))
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
            await removeLeaderToTeam(teamAndWorker, cookies.get('accessToken'))
            const user = convertWorker(teamAndWorker.userId, selectTeam(getState()))
            dispatch(updateWorkerAC(user))
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