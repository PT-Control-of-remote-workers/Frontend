import React, {useState} from "react";
import {connect} from "react-redux";
import {selectTeam} from "../../../../../../redux/selectors/selectors";
import {InviteWorker} from "./InviteWorker";
import {addWorker} from "../../../../../../redux/reducers/workers_reduce";

function InviteWorkerContainer({team, addWorker}) {
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

    async function onSubmit() {
        try {
            addWorker(value.username)
            onClose()
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    return (
        <InviteWorker
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
    addWorker
})(InviteWorkerContainer)