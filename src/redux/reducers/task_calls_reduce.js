import {cookies} from '../../utils/cookiesUtils'
import {taskCalls, teamCalls} from "../../api/statistics_api";
import {getStatisticOfTask} from "./team_calls_reduce";
import {closeTask, completeTask, getTask, removeTask, resumeTask, updateTask} from "../../api/task_api";
import {TASK_STAGES, updateTaskInTasks} from "./tasks_reduce";
import {getTeam} from "../../api/teams_api";
import {getUser} from "../../api/user_api";

const SET_CALLS = 'CALLS_TASK_SET'
const UPDATE_TASK = "CALLS_TASK_UPDATE"

const defaultState = {
    task: null,
    statistic: null,
    calls: null,
    team: null,
    workers: null
}

export default function taskCallsReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_CALLS): {
            return {
                ...state,
                calls: action.calls,
                statistic: action.statistic,
                task: action.task,
                team: action.team,
                workers: action.workers,
            }
        }
        case (UPDATE_TASK): {
            return {
                ...state,
                task: action.task
            }
        }
        default: {
            return state
        }
    }
}

function setCallsAC(task, calls, statistic, team, workers) {
    return {
        type: SET_CALLS,
        calls: calls,
        statistic: statistic,
        task: task,
        team: team,
        workers: workers
    }
}

function updateTaskAC(task) {
    return {
        type: UPDATE_TASK,
        task: task
    }
}

function clearCallsAC() {
    return {
        type: SET_CALLS,
        calls: null,
        statistic: null,
        task: null
    }
}

export function loadStatisticTaskFromServ(periodCalls) {
    return async (dispatch, getState) => {
        try {
            const task = await getTask(periodCalls.taskId, cookies.get('accessToken'))
            const calls = await taskCalls(periodCalls, cookies.get('accessToken'))
            const team = await getTeam(task.teamId, cookies.get('accessToken'))

            const set = new Set(calls.map((c)=> {
                return c.workerId
            }))
            let workers = {}
            for(let w of set) {
                let userData = await getUser(w)
                userData = {
                    ...userData,
                    ...userData.userAttributes.reduce((acc, att) => {
                        acc[att.name] = att.value
                        return acc
                    })
                }
                workers[w] = userData
            }
            workers = Object.values(workers)

            const statistic = getStatisticOfTask(calls, 10)

            dispatch(setCallsAC(task, calls, statistic, team, workers))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function updateStatisticsTask(task) {
    return async (dispatch, getState) => {
        try {
            const updatedTask = await updateTask(task, cookies.get('accessToken'))

            dispatch(updateTaskAC(updatedTask))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function removeStatisticsTask(taskId) {
    return async (dispatch, getState) => {
        try {
            await removeTask(taskId, cookies.get('accessToken'))

            dispatch(clearCallsAC())
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function changeStageTaskOnServ(taskId, stage) {
    return async (dispatch, getState) => {
        try {
            let response
            switch (stage) {
                case(TASK_STAGES.close): {
                    response = await closeTask(taskId, cookies.get('accessToken'))
                    break
                }
                case(TASK_STAGES.resume): {
                    response = await resumeTask(taskId, cookies.get('accessToken'))
                    break
                }
                case(TASK_STAGES.complete): {
                    response = await completeTask(taskId, cookies.get('accessToken'))
                    break
                }
                default: {
                    throw new Error(`Unknown stage ${stage}`)
                }
            }
            dispatch(updateTaskAC(response))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
