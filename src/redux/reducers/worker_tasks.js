import {cookies} from '../../utils/cookiesUtils'
import {tasksOfWorker} from "../../api/task_api";

const SET_TASKS = 'WORKER_TASKS_SET'

const defaultState = {
    tasks: null
}

export default function workerTasksReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_TASKS): {
            return {
                ...state,
                tasks: action.tasks
            }
        }
        default: {
            return state
        }
    }
}

function setTasksAC(tasks) {
    return {
        type: SET_TASKS,
        tasks: tasks
    }
}

export function loadWorkerTasksFromServ(workerId) {
    return async (dispatch, getState) => {
        try {
            const response = await tasksOfWorker(workerId, cookies.get('accessToken'))
            dispatch(setTasksAC(response))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
