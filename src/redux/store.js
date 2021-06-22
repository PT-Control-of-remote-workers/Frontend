import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {workersReducer} from "./reducers/workers_reduce";
import teamReducer from "./reducers/team_reducer";
import teamsReducer from "./reducers/teams_reducer";
import teamCallsReducer from "./reducers/team_calls_reduce";
import taskCallsReducer from "./reducers/task_calls_reduce";
import userReducer from "./reducers/user_reducer";
import tasksReducer from "./reducers/task_reduce";
import workerTasksReducer from "./reducers/worker_tasks";

const reducers = combineReducers({
    workers: workersReducer,
    team: teamReducer,
    teams: teamsReducer,
    teamCalls: teamCallsReducer,
    taskCalls: taskCallsReducer,
    user: userReducer,
    tasks: tasksReducer,
    workerTasks: workerTasksReducer
})

const store = createStore(reducers, compose(applyMiddleware(thunkMiddleware)))

export {store}