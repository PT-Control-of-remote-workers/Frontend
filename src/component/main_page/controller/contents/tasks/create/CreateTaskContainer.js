import {connect} from "react-redux";
import React, {useState} from "react";
import {CreateTask} from "./CreateTask";
import {createTaskOnServ} from "../../../../../../redux/reducers/tasks_reduce";
import {selectSimpleTeam} from "../../../../../../redux/selectors/selectors";

function CreateTaskContainer({team, createTask}) {
    const primaryValue = {
        name: '',
        description: ''
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
                createTask({
                    ...value,
                    teamId: team.id
                })
            ])
                .catch(err => {
                    setErrorMessage(err.message)
                })
                .finally(() => {
                    onClose()
                })
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    return (
        <CreateTask
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
    team: selectSimpleTeam(state)
})

export default connect(mapStateToProps, {
    createTask: createTaskOnServ
})(CreateTaskContainer)