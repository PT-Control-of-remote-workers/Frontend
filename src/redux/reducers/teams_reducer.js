import {createTeam, getTeams, removeTeam, removeWorkerToTeam, updateTeam} from "../../api/teams_api";
import {cookies} from '../../utils/cookiesUtils'
import {selectSimpleTeam} from "../selectors/selectors";
import {clearTeamAC, setSimpleTeamAC} from "./workers_reduce";

const SET_TEAMS = 'TEAMS_SET'
const REMOVE_TEAM = 'TEAMS_REMOVE'
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
            const newState = {}
            newState.teams = action.teams
            return {
                ...state,
                ...newState
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

export function loadTeamsFromServ(username) {
    return async (dispatch, getState) => {
        try {
            const response = await getTeams(username, cookies.get('accessToken'))
            dispatch(setTeamsAC(response))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function createTeamOnServ(team) {
    return async (dispatch, getState) => {
        try {
            const response = await createTeam(team, cookies.get('accessToken'))
            dispatch(addTeamAC(response))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function removeTeamFromServ(teamId) {
    return async (dispatch, getState) => {
        try {
            await removeTeam(teamId, cookies.get('accessToken'))
            dispatch(removeTeamAC(teamId))
            const team = selectSimpleTeam(getState())
            if (team && team.id === teamId) {
                dispatch(clearTeamAC())
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function removeWorkerFromTeam(teamAndUsername) {
    return async (dispatch, getState) => {
        try {
            await removeWorkerToTeam(teamAndUsername, cookies.get('accessToken'))
            dispatch(removeTeamAC(teamAndUsername.id))
            const team = selectSimpleTeam(getState())
            if (team && team.id === teamAndUsername.id) {
                dispatch(clearTeamAC())
            }
        } catch (err) {
            return Promise.reject(err)
        }
    }
}