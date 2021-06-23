import React, {useEffect, useState} from "react";
import {Box} from "grommet";
import {selectTeams} from "../../../../../redux/selectors/selectors";
import {connect} from "react-redux";
import {
    loadTeamsFromServ,
    removeTeamFromServ,
    removeWorkerFromTeam
} from "../../../../../redux/reducers/teams_reducer";
import {getUsernameFromCookie} from "../../../../../utils/cookiesUtils";
import Teams from "./Teams";
import {setSimpleTeamAC} from "../../../../../redux/reducers/workers_reduce";
import {useHistory} from "react-router-dom";

function TeamsContainer({teams, loadTeams, removeWorker, removeTeam, chooseTeam}) {
    const username = getUsernameFromCookie()
    const [hasData, setData] = useState(false)

    useEffect(() => {
        if (!hasData) {
            loadTeams(getUsernameFromCookie())
            setData(true)
        }
    })

    async function remove(id) {
        removeTeam(id)
    }

    async function leave(id) {
        removeWorker({
            id: id,
            userId: username
        })
    }

    async function choose(team) {
        chooseTeam(team)
    }

    return (
        <Box
            fill
            gap={"medium"}
            direction={"column"}
            justify="start"
            align={"center"}
            width={"100%"}
            height={"100%"}
        >
            <Teams
                username={username}
                allTeams={teams}
                choose={choose}
                remove={remove}
                leave={leave}
            />
        </Box>
    )
}

function mapStateToProps(state) {
    return {
        teams: selectTeams(state),
    }
}

export default connect(mapStateToProps, {
    loadTeams: loadTeamsFromServ,
    removeWorker: removeWorkerFromTeam,
    removeTeam: removeTeamFromServ,
    chooseTeam: setSimpleTeamAC,
})(TeamsContainer)