import React, {useState} from "react";
import {connect} from "react-redux";
import {createTeamOnServ} from "../../../../../redux/reducers/teams_reducer";
import {getUsernameFromCookie} from "../../../../../utils/cookiesUtils";
import {CreateTeam} from "./CreateTeam";

function CreateTeamContainer({addTeam}) {
    const primaryValue = {
        name: '',
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
            addTeam({
                ...value,
                admin: username
            })
            onClose()
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    return (
        <CreateTeam
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
    addTeam: createTeamOnServ
})(CreateTeamContainer)