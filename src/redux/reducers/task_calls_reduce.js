import {Cookies} from 'react-cookie'
import {teamCalls} from "../../api/statistics_api";
import {getStatisticOfTask} from "./team_calls_reduce";

const SET_CALLS = 'CALLS_TASK_SET'

const defaultState = {
    statistic: null,
    calls: []
}

export default function taskCallsReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_CALLS): {
            return {
                ...state,
                calls: action.calls,
                statistic: action.statistic
            }
        }
        default: {
            return state
        }
    }
}

function setCallsAC(calls, statistic) {
    return {
        type: SET_CALLS,
        calls: calls,
        statistic: statistic
    }
}

export function loadStatisticTaskFromServ(periodCalls) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const calls = await teamCalls(periodCalls, cookies.get('accessToken'))

            const statistic = getStatisticOfTask(calls, 10)

            dispatch(setCallsAC(calls, statistic))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
