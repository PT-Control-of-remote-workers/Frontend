import {
    selectTaskCalls,
    selectTaskFromStatistic,
    selectTaskStatistic,
    selectTeam, selectTeamFromStatistic, selectWorkersFromStatistic
} from "../../../../../redux/selectors/selectors";
import {connect} from "react-redux";
import {
    changeStageTaskOnServ, loadStatisticTaskFromServ,
    removeStatisticsTask,
    updateStatisticsTask
} from "../../../../../redux/reducers/task_calls_reduce";
import React, {useContext, useEffect, useState} from "react";
import {TASK_STAGES} from "../../../../../redux/reducers/tasks_reduce";
import {useHistory, useRouteMatch} from "react-router-dom";
import {Task} from "./Task";
import {getUser} from "../../../../../api/user_api";

function TaskContainer({workers, task, stats, calls, team, changeState, removeTask, loadStats}) {

    let match = useRouteMatch();
    const taskId = match.params.taskId;

    const [hasData, setData] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const history = useHistory()

    useEffect(() => {
        if (!hasData) {
            loadStats({
                taskId,
                periodType: 'ALL',
                date: new Date()
            })
            setData(true)
        }
    })

    async function resume() {
        try {
            setErrorMessage(undefined)
            Promise.all([
                changeState(task.id, TASK_STAGES.resume)
            ])
                .catch(err => {
                    setErrorMessage(err.message)
                })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    async function finish() {
        try {
            setErrorMessage(undefined)
            Promise.all([
                changeState(task.id, TASK_STAGES.close)
            ])
                .catch
                (err => {
                    setErrorMessage(err.message)
                })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    async function complete() {
        try {
            setErrorMessage(undefined)
            Promise.all([
                changeState(task.id, TASK_STAGES.complete),
            ])
                .catch
                (err => {
                    setErrorMessage(err.message)
                })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    async function remove() {
        try {
            setErrorMessage(undefined)
            Promise.all([
                removeTask(task.id),
            ])
                .catch(err => {
                    setErrorMessage(err.message)
                })
            history.push(`/main/team/${task.teamId}/tasks`)
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    function view(workerId) {
        history.push(`/main/tasks/${taskId}/workers/${workerId}`)
    }

    return (
        <Task
            stats={stats}
            calls={calls}
            task={task}
            team={team}
            remove={remove}
            resume={resume}
            finish={finish}
            complete={complete}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            view={view}
            workers={workers}
        />
    )
}

const mapStateToProps = (state) => ({
    stats: selectTaskStatistic(state),
    task: selectTaskFromStatistic(state),
    calls: selectTaskCalls(state),
    team: selectTeamFromStatistic(state),
    workers: selectWorkersFromStatistic(state),
})

export default connect(mapStateToProps, {
    changeState: changeStageTaskOnServ,
    removeTask: removeStatisticsTask,
    updateTask: updateStatisticsTask,
    loadStats: loadStatisticTaskFromServ,
})(TaskContainer)