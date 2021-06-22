import {selectTeam, selectTeams} from "../../../../redux/selectors/selectors";
import {connect} from "react-redux";
import {loadTeamsFromServ, removeTeamFromServ, removeWorkerFromTeam} from "../../../../redux/reducers/teams_reducer";
import {loadTeamFromServ} from "../../../../redux/reducers/team_reducer";
import Sidebar from "./Sidebar";
import React from "react";

function SidebarContainer({setContent, curTeam}) {
    let teamName
    if (curTeam) {
        teamName = curTeam.name
    } else {
        teamName = "Select team"
    }

    return (
        <Sidebar
            teamName={teamName}
            setContent={setContent}
            isTeamSelect={curTeam}
        />
    )
}

function mapStateToProps(state) {
    return {
        curTeam: selectTeam(state),
    }
}

export default connect(mapStateToProps)(SidebarContainer)