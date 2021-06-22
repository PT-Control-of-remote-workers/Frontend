import {Cookies} from 'react-cookie'
import {teamCalls} from "../../api/statistics_api";

const SET_CALLS = 'SET_TASKS'

const defaultState = {
    statistics: null,
    calls: []
}

export default function teamCallsReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_CALLS): {
            return {
                ...state,
                calls: action.calls,
                statistics: action.statistics
            }
        }
        default: {
            return state
        }
    }
}

function setCallsAC(calls, statistics) {
    return {
        type: SET_CALLS,
        calls: calls,
        statistics: statistics
    }
}

export function loadStatisticTeamFromServ(periodCalls) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            const response = await teamCalls(periodCalls, cookies.get('accessToken'))

            const statistics = {}
            const calls = response.reduce((sum = {}, acc) => {
                if (!sum[acc.taskId]) {
                    sum[acc.taskId] = []
                }
                sum[acc.taskId].push(acc)
                return sum
            })

            for (const [taskId, callsOfTask] of Object.entries(calls)) {
                statistics[taskId] = getStatisticOfTask(callsOfTask, 10)
            }

            dispatch(setCallsAC(calls, statistics))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function getStatisticOfTask(calls, distance) {
    calls.sort()

    let statistic = {
        timeWork: 0,
        timePause: 0
    }

    for (const call in calls) {
        if (call.type === 'WORKING') {
            statistic.timeWork += distance
        } else {
            statistic.timePause += distance
        }
    }
    
    return statistic;
}
