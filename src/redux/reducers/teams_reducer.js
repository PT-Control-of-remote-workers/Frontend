import {createTeam, getTeams, removeTeam, removeWorkerToTeam, updateTeam} from "../../api/teams_api";
import {Cookies} from 'react-cookie'

const SET_TEAMS = 'TEAMS_SET'
const REMOVE_TEAM = 'TEAMS_REMOVE'
const UPDATE_TEAM = 'TEAMS_UPDATE'
const ADD_TEAM = 'TEAMS_ADD'

const defaultState = {
    teams: null
}

export default function teamsReducer(state = defaultState, action) {
    switch (action.type) {
        case(ADD_TEAM): {
            const id = `${action.team.id}`
            return {
                ...state,
                teams: {
                    ...state.teams,
                    [id]: action.team
                }
            }
        }
        case(SET_TEAMS): {
            return {
                ...state,
                teams: action.teams
            }
        }
        case(REMOVE_TEAM): {
            const newState = {}
            newState.teams = {...state.teams}
            delete newState.teams[action.key]
            return {
                ...state,
                ...newState
            }
        }
        case(UPDATE_TEAM): {
            const id = `${action.team.id}`
            return {
                ...state,
                teams: {
                    ...state.teams,
                    [id]: action.team
                }
            }
        }
        default: {
            return state
        }
    }
}

function addTeamAC(team) {
    return {
        type: ADD_TEAM,
        team: team
    }
}

function removeTeamAC(teamId) {
    return {
        type: REMOVE_TEAM,
        key: teamId
    }
}

function setTeamsAC(teams) {
    const teamsMap = {}
    if (teams.length !== 0) {
        for (let i = 0; i < teams.length; i++) {
            teamsMap[teams[i].id] = teams[i]
        }
    }
    return {
        type: SET_TEAMS,
        teams: teamsMap
    }
}

function updateTeamAC(team) {
    return {
        type: UPDATE_TEAM,
        team: team
    }
}

export function loadTeamsFromServ(username) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const response = await getTeams(username, cookies.get('accessToken'))
            dispatch(setTeamsAC(response))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function updateTeamOnServ(team) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const response = await updateTeam(team, cookies.get('accessToken'))
            dispatch(updateTeamAC(response))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function createTeamOnServ(team) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const response = await createTeam(team, cookies.get('accessToken'))
            dispatch(addTeamAC(response))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function removeTeamFromServ(teamId) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            await removeTeam(teamId, cookies.get('accessToken'))
            dispatch(removeTeamAC(teamId))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function removeWorkerFromTeam(teamAndUsername) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            await removeWorkerToTeam(teamAndUsername, cookies.get('accessToken'))
            dispatch(removeTeamAC(teamAndUsername.id))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}