import {selectSimpleTeam, selectTeam, selectTeams} from "../../../../redux/selectors/selectors";
import {connect} from "react-redux";
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
        curTeam: selectSimpleTeam(state),
    }
}

export default connect(mapStateToProps)(SidebarContainer)