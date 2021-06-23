import {connect} from "react-redux";
import {selectTeam} from "../../../../../redux/selectors/selectors";
import React, {useEffect, useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {
    loadWorkersFromServ,
    makeLeaderWorker,
    removeLeaderTeam, removeWorkerFromTeam,
    setAdminTeam
} from "../../../../../redux/reducers/workers_reduce";
import {Team} from "./Team";

function TeamContainer({team, loadTeam, removeLeader, setLeader, removeWorker, setAdminTeam}) {

    let match = useRouteMatch();
    const teamId = match.params.teamId;

    const [hasData, setData] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const history = useHistory()

    useEffect(() => {
        if (!hasData) {
            loadTeam(teamId)
            setData(true)
        }
    })

    async function makeWorker(workerId) {
        try {
            removeLeader({
                userId: workerId,
                id: teamId
            }).catch(err => {
                setErrorMessage(err.message)
            })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    async function makeLeader(workerId) {
        try {
            setLeader({
                userId: workerId,
                id: teamId
            }).catch(err => {
                setErrorMessage(err.message)
            })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    async function setAdmin(workerId) {
        try {
            setAdminTeam({
                userId: workerId,
                id: teamId
            })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    async function kickWorker(workerId) {
        try {
            removeWorker({
                userId: workerId,
                id: teamId
            }).catch(err => {
                setErrorMessage(err.message)
            })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    function toTasks() {
        history.push(`/main/teams/${teamId}/tasks`)
    }

    return (
        <Team
            toTasks={toTasks}
            team={team}
            makeWorker={makeWorker}
            makeLeader={makeLeader}
            setAdmin={setAdmin}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            removeWorker={kickWorker}
        />
    )
}

const mapStateToProps = (state) => ({
    team: selectTeam(state)
})

export default connect(mapStateToProps, {
    loadTeam: loadWorkersFromServ,
    removeLeader: removeLeaderTeam,
    setLeader: makeLeaderWorker,
    removeWorker: removeWorkerFromTeam,
    setAdminTeam,
})(TeamContainer)