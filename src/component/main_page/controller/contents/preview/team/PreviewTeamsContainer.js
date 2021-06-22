import {useEffect, useState} from "react";
import {selectTeams, selectUserData} from "../../../../../../redux/selectors/selectors";
import {connect} from "react-redux";
import {loadTeamsFromServ} from "../../../../../../redux/reducers/teams_reducer";
import PreviewTeams from "./PreviewTeams";
import {getUsernameFromCookie} from "../../../../../../utils/cookiesUtils";

function PreviewTeamsContainer({loadTeamsFromServ, teams}) {

    const [hasData, setData] = useState(false)

    useEffect(() => {
        if (!hasData) {
            loadTeamsFromServ(getUsernameFromCookie())
            setData(true)
        }
    })

    return (
        <PreviewTeams
            username={getUsernameFromCookie()}
            allTeams={teams}
        />
    )
}

function mapStateToProps(state) {
    return {
        teams: selectTeams(state),
    }
}

export default connect(mapStateToProps, {
    loadTeamsFromServ
})(PreviewTeamsContainer)