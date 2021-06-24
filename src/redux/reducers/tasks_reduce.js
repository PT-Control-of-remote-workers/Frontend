import {cookies} from '../../utils/cookiesUtils'
import {getTeam} from "../../api/teams_api";
import {
    resumeTask,
    closeTask,
    createTask,
    importTrello,
    removeTask,
    updateTask,
    completeTask, setWorker
} from "../../api/task_api";

const SET_TASKS = 'TASK_SET'
const REMOVE_TASK = 'TASK_REMOVE'
const UPDATE_TASK = 'TASK_UPDATE'
const ADD_TASK = 'TASK_ADD_ALL'
const ADD_TASKS = 'TASK_ADD_TASKS'

export const TASK_STAGES = {
    close: 'CLOSE',
    resume: 'RESUME',
    complete: 'COMPLETE'
}

const defaultState = {
    tasks: null
}

export default function tasksReducer(state = defaultState, action) {
    switch (action.type) {
        case(ADD_TASK): {
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.task.id]: action.task
                }
            }
        }
        case(ADD_TASKS): {
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    ...action.tasks
                }
            }
        }
        case(SET_TASKS): {
            return {
                ...state,
                tasks: action.tasks
            }
        }
        case(REMOVE_TASK): {
            const newState ={}
            newState.tasks = {...state.tasks}
            delete newState.tasks[action.key]
            return {
                ...state,
                ...newState
            }
        }
        case(UPDATE_TASK): {
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.task.id]: action.task
                }
            }
        }
        default: {
            return state
        }
    }
}

function addTaskAC(task) {
    return {
        type: ADD_TASK,
        task: task
    }
}

function removeTaskAC(taskId) {
    return {
        type: REMOVE_TASK,
        key: taskId
    }
}

function setTasksAC(tasks) {
    let mapTasks = {}
    if (tasks.length !== 0) {
        for (let i = 0; i < tasks.length; i++) {
            let task = tasks[i]
            mapTasks[task.id] = task
        }
    }
    return {
        type: SET_TASKS,
        tasks: mapTasks
    }
}

function addTasksAC(tasks) {
    const mapTasks = {}
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i]
        mapTasks[task.id] = task
    }
    return {
        type: ADD_TASKS,
        tasks: mapTasks
    }
}

function updateTaskAC(task) {
    return {
        type: UPDATE_TASK,
        task: task
    }
}

export function loadTasksFromServ(teamId) {
    return async (dispatch, getState) => {
        try {
            const response = await getTeam(teamId, cookies.get('accessToken'))
            dispatch(setTasksAC(response.tasks))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function loadTasksFromTrello(trello) {
    return async (dispatch, getState) => {
        try {
            const response = await importTrello(trello, cookies.get('accessToken'))
            dispatch(addTasksAC(response))
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

export function setWorkerOnTask(workerId) {
    return async (dispatch, getState) => {
        try {
            const response = await setWorker(workerId, cookies.get('accessToken'))
            dispatch(updateTaskAC(response))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function updateTaskOnServ(task) {
    return async (dispatch, getState) => {
        try {
            const response = await updateTask(task, cookies.get('accessToken'))
            dispatch(updateTaskAC(response))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function createTaskOnServ(task) {
    return async (dispatch, getState) => {
        try {
            const response = await createTask(task, cookies.get('accessToken'))
            dispatch(addTaskAC(response))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function removeTaskFromServ(taskId) {
    return async (dispatch, getState) => {
        try {
            await removeTask(taskId, cookies.get('accessToken'))
            dispatch(removeTaskAC(taskId))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
