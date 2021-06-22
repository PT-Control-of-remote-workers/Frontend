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
import {loadTeamFromServ} from "../../../../../redux/reducers/team_reducer";
import Teams from "./Teams";

function TeamsContainer({teams, loadTeams, removeWorker, removeTeam, chooseTeam}) {
    const username = getUsernameFromCookie()
    const [hasData, setData] = useState(false)

    useEffect(() => {
        if (!hasData) {
            loadTeams(getUsernameFromCookie())
            setData(true)
        }
    })

    function remove(id) {
        removeTeam(id)
    }

    function leave(id) {
        removeWorker({
            id: id,
            userId: username
        })
    }

    function choose(id) {
        chooseTeam(id)
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
    chooseTeam: loadTeamFromServ,
})(TeamsContainer)