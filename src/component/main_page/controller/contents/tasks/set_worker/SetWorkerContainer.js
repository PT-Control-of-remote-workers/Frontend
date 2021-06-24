import {SetWorker} from "./SetWorker";
import {connect} from "react-redux";
import React, {useState} from "react";
import {selectTeam} from "../../../../../../redux/selectors/selectors";
import {setWorkerOnTask} from "../../../../../../redux/reducers/tasks_reduce";

function SetWorkerContainer({task, team, setWorkerOnTask}) {
    const [worker, setWorker] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('')

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => setOpen(undefined);

    function onSubmit() {
        try {
            Promise.all([
                setWorkerOnTask({
                    workerId: worker,
                    taskId: task.id
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
        <SetWorker
            workers={team.workers}
            onSubmit={onSubmit}
            worker={worker}
            setWorker={setWorker}
            errorMessage={errorMessage}
            onOpen={onOpen}
            onClose={onClose}
            isOpen={open}
            search={search}
            setSearch={setSearch}
        />
    )
}

const mapStateToProps = (state) => ({
    team: selectTeam(state)
})

export default connect(mapStateToProps, {
    setWorkerOnTask
})(SetWorkerContainer)