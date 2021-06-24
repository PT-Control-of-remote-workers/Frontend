import {connect} from "react-redux";
import {selectTasksOfTeam, selectTeam} from "../../../../../redux/selectors/selectors";
import React, {useEffect, useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {
    changeStageTaskOnServ,
    loadTasksFromServ,
    removeTaskFromServ,
    TASK_STAGES
} from "../../../../../redux/reducers/tasks_reduce";
import {loadWorkersFromServ} from "../../../../../redux/reducers/workers_reduce";
import {Tasks} from "./Tasks";

function TasksContainer({team, tasks, loadTeam, loadTasks, changeStateTask, removeTaskFromServ}) {

    let match = useRouteMatch();
    const teamId = match.params.teamId;

    const [hasData, setData] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const history = useHistory()

    useEffect(() => {
        if (!hasData) {
            setErrorMessage(undefined)
            Promise.all([
                loadTeam(teamId),
                loadTasks(teamId)
            ])
                .catch(err => {
                    setErrorMessage(err.message)
                })
            setData(true)
        }
    })

    async function resumeTask(taskId) {
        try {
            setErrorMessage(undefined)
            Promise.all([
                changeStateTask(taskId, TASK_STAGES.resume)
            ])
                .catch(err => {
                    setErrorMessage(err.message)
                })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    async function finishTask(taskId) {
        try {
            setErrorMessage(undefined)
            Promise.all([
                changeStateTask(taskId, TASK_STAGES.close)
            ])
                .catch
                (err => {
                    setErrorMessage(err.message)
                })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    async function completeTask(taskId) {
        try {
            setErrorMessage(undefined)
            Promise.all([
                changeStateTask(taskId, TASK_STAGES.complete)
            ])
                .catch
                (err => {
                    setErrorMessage(err.message)
                })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    async function removeTask(taskId) {
        try {
            setErrorMessage(undefined)
            Promise.all([
                removeTaskFromServ(taskId)
            ])
                .catch(err => {
                    setErrorMessage(err.message)
                })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    async function toTask(taskId) {
        try {
            history.push(`/main/tasks/${taskId}`)
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    return (
        <Tasks
            team={team}
            tasks={tasks}
            finishTask={finishTask}
            resumeTask={resumeTask}
            completeTask={completeTask}
            removeTask={removeTask}
            toTask={toTask}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
        />
    )
}

const mapStateToProps = (state) => ({
    team: selectTeam(state),
    tasks: selectTasksOfTeam(state)
})

export default connect(mapStateToProps, {
    loadTeam: loadWorkersFromServ,
    loadTasks: loadTasksFromServ,
    changeStateTask: changeStageTaskOnServ,
    removeTaskFromServ,
})(TasksContainer)