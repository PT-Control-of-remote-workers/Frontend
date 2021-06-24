import {connect} from "react-redux";
import React, {useState} from "react";
import {EditTask} from "./EditTask";
import {updateStatisticsTask} from "../../../../../../redux/reducers/task_calls_reduce";

function EditTaskContainer({task, updateTask}) {
    const [value, setValue] = useState(task)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setValue(task)
        setOpen(true);
    }

    const onClose = () => {
        setValue(undefined)
        setOpen(undefined);
    }

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
    updateTask: updateStatisticsTask
})(EditTaskContainer)