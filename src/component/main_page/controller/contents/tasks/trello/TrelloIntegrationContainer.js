import {connect} from "react-redux";
import React, {useState} from "react";
import {TrelloIntegration} from "./TrelloIntegration";
import {loadTasksFromTrello} from "../../../../../../redux/reducers/task_reduce";
import {selectTeam} from "../../../../../../redux/selectors/selectors";

function TrelloIntegrationContainer({team, loadTrello}) {
    const primaryValue = {
        nameList: '',
        token: '',
        board: '',
        teamID: team.id
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
            Promise.all([
                loadTrello(value)
            ])
                .then(onClose)
                .catch(err => {
                    setErrorMessage(err.message)
                })

        } catch (err) {
            setErrorMessage(err.message)
        }
    }
    return (
        <TrelloIntegration
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
    loadTrello: loadTasksFromTrello
})(TrelloIntegrationContainer)