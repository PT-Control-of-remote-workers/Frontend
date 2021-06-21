import {} from '../../API/team_api'
import {createTeam, getTeam, getTeams, removeTeam} from "../../api/teams_api";
import {Cookies} from 'react-cookie'

const SET_TEAM = 'SET_TEAM'

const defaultState = {
    team: null
}

export default function teamReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_TEAM): {
            return {
                ...state,
                team: action.team
            }
        }
        default: {
            return state
        }
    }
}

function setTeamAC(team) {
    return {
        type: SET_TEAM,
        team: team
    }
}

export function loadTeamFromServ(teamId) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const response = await getTeam(team, cookies.get('accessToken'))
            dispatch(setTeamAC(response))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}