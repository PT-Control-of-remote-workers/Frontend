import {createTeam, getTeam, getTeams, removeTeam} from "../../api/teams_api";
import {Cookies} from 'react-cookie'

const SET_TEAM = 'TEAM_SET'

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
            const response = await getTeam(teamId, cookies.get('accessToken'))
            dispatch(setTeamAC(response))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
