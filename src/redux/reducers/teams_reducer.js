import {} from '../../API/team_api'
import {createTeam, getTeams, removeTeam} from "../../api/teams_api";
import {Cookies} from 'react-cookie'

const SET_TEAMS = 'SET_TEAMS'
const REMOVE_TEAM = 'REMOVE_TEAM'
const UPDATE_TEAM = 'UPDATE_TEAM'
const ADD_TEAM = 'ADD_TEAM'

const defaultState = {
    teams: {}
}

export default function teamsReducer(state = defaultState, action) {
    switch (action.type) {
        case(ADD_TEAM): {
            state.teams[action.team.id] = action.team
            return state
        }
        case(SET_TEAMS): {
            return {
                ...state,
                teams: action.teams
            }
        }
        case(REMOVE_TEAM): {
            delete state.teams[action.key]
            return state
        }
        case(UPDATE_TEAM): {
            state.teams[action.team.id] = action.team
            return state;
        }
        default: {
            return state
        }
    }
}

function addTeamAC(team) {
    return {
        type: REMOVE_TEAM,
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
    teams = teams.reduce((sum, act) => {
        sum[act.id] = act
        return sum;
    })
    return {
        type: SET_TEAMS,
        teams: teams
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
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function updateTeamOnServ(team) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const response = await updateTeamAC(team, cookies.get('accessToken'))
            dispatch(updateTeamAC(response))
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
        } catch (err) {
            return Promise.reject(err)
        }
    }
}