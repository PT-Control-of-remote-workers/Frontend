import {selectSimpleTeam, selectTeam, selectTeams} from "../../../../redux/selectors/selectors";
import {connect} from "react-redux";
import Sidebar from "./Sidebar";
import React, {useState} from "react";

function SidebarContainer({curTeam}) {

    const [errorMessage, setErrorMessage] = useState(undefined)

    return (
        <Sidebar
            team={curTeam}
            isTeamSelect={curTeam}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
        />
    )
}

function mapStateToProps(state) {
    return {
        curTeam: selectSimpleTeam(state),
    }
}

export default connect(mapStateToProps)(SidebarContainer)