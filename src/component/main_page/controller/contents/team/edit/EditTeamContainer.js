import {EditTeam} from "./EditTeam";

import React, {useState} from "react";
import {connect} from "react-redux";
import {getUsernameFromCookie} from "../../../../../../utils/cookiesUtils";
import {selectTeam} from "../../../../../../redux/selectors/selectors";
import {updateTeamOnServ} from "../../../../../../redux/reducers/workers_reduce";

function EditTeamContainer({team, editTeam}) {
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
    team: selectTeam(state)
})

export default connect(mapStateToProps, {
    editTeam: updateTeamOnServ
})(EditTeamContainer)