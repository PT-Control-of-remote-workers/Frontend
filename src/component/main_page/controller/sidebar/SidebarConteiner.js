import {selectSimpleTeam, selectTeam, selectTeams} from "../../../../redux/selectors/selectors";
import {connect} from "react-redux";
import Sidebar from "./Sidebar";
import React from "react";

function SidebarContainer({curTeam}) {
    return (
        <Sidebar
            team={curTeam}
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