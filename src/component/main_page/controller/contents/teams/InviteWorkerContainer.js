import {EditTeam} from "./EditTeam";

import React, {useState} from "react";
import {connect} from "react-redux";
import {createTeamOnServ, updateTeamOnServ} from "../../../../../redux/reducers/teams_reducer";
import {getUsernameFromCookie} from "../../../../../utils/cookiesUtils";
import {addWorkerToTeam} from "../../../../../api/teams_api";

function InviteWorkerContainer({team, editTeam}) {
    const primaryValue = {
        name: team.name,
    }

    const [value, setValue] = useState(primaryValue)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => setOpen(undefined);

    function onSubmit() {
        try {
            const username = getUsernameFromCookie()
            editTeam({
                ...value,
                id: team.id
            })
            onClose()
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    return (
        <EditTeam
            team={team}
            onSubmit={onSubmit}
            setValue={setValue}
            value={value}
            onOpen={onOpen}
            onClose={onClose}
            isOpen={open}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
        />
    )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
    editTeam: addWorkerToTeam
})(InviteWorkerContainer)