import {selectWorkerTaskCalls} from "../../../../../redux/selectors/selectors";
import {connect} from "react-redux";
import {loadWorkerTaskCalls} from "../../../../../redux/reducers/worker_task_calls_reduce";
import {useRouteMatch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Details} from "./Details";

function DetailsContainer({callsWorkerTask, loadState}) {
    let match = useRouteMatch();
    const taskId = match.params.taskId;
    const workerId = match.params.workerId;

    const [hasData, setData] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    useEffect(() => {
        if (!hasData) {
            loadState(workerId, taskId)
            setData(true)
        }
    })

    return (
        <Details
            state={callsWorkerTask}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
        />
    )
}

const mapStateToProps = (state) => ({
    callsWorkerTask: selectWorkerTaskCalls(state),
})

export default connect(mapStateToProps, {
    loadState: loadWorkerTaskCalls
})(DetailsContainer)