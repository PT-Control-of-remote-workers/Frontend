import {loadTasksFromServ} from "./tasks_reduce";
import {getUser} from "../../api/user_api";
import {workerTaskCalls} from "../../api/statistics_api";
import {cookies} from "../../utils/cookiesUtils";
import {getTask} from "../../api/task_api";

const defaultState = {
    calls: null
}

const SET = 'WORKER_TASK_CALLS_SET'

export function workerTaskCallsReduce(state = defaultState, action) {
    switch (action.type) {
        case(SET): {
            return {
                ...state,
                calls: {
                    worker: action.worker,
                    task: action.task,
                    calls: action.calls,
                }
            }
        }
        default: {
            return state
        }
    }
}

export function loadWorkerTaskCalls(workerId, taskId) {
    return async (dispatch, getState) => {
        try {
            const task = await getTask(taskId, cookies.get('accessToken'))
            let worker = await getUser(workerId)
            worker = {
                ...worker,
                ...worker.userAttributes.reduce((acc, att) => {
                    acc[att.name] = att.value
                    return acc
                })
            }
            const calls = await workerTaskCalls({
                workerId,
                taskId,
                date: new Date(),
                periodType: 'ALL'
            }, cookies.get('accessToken'))
            dispatch({
                type: SET,
                worker: worker,
                task: task,
                calls: calls,
            })
        } catch (err) {
            return Promise.reject(err)
        }
    }
}