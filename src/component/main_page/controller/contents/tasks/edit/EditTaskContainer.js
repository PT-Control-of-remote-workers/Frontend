import {connect} from "react-redux";
import React, {useState} from "react";
import {EditTask} from "./EditTask";
import {updateTaskOnServ} from "../../../../../../redux/reducers/task_reduce";

function EditTaskContainer({task, updateTask}) {
    const primaryValue = {
        name: task.name,
        description: task.description
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
                updateTask({
                    ...value,
                    id: task.id
                })
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
        <EditTask
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
    updateTask: updateTaskOnServ
})(EditTaskContainer)