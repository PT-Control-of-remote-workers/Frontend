import {useEffect, useState} from "react";
import {selectTeams, selectUserData, selectWorkerTasks} from "../../../../../../redux/selectors/selectors";
import {connect} from "react-redux";
import {loadTeamsFromServ} from "../../../../../../redux/reducers/teams_reducer";
import {getUsernameFromCookie} from "../../../../../../utils/cookiesUtils";
import PreviewTasks from "./PreviewTasks";
import {loadWorkerTasksFromServ} from "../../../../../../redux/reducers/worker_tasks";

function PreviewTasksContainer({loadWorkerTasksFromServ, tasks}) {

    const [hasData, setData] = useState(false)

    useEffect(() => {
        if (!hasData) {
            loadWorkerTasksFromServ(getUsernameFromCookie())
            setData(true)
        }
    })

    return (
        <PreviewTasks
            allTasks={tasks}
        />
    )
}

function mapStateToProps(state) {
    return {
        tasks: selectWorkerTasks(state),
    }
}

export default connect(mapStateToProps, {
    loadWorkerTasksFromServ
})(PreviewTasksContainer)