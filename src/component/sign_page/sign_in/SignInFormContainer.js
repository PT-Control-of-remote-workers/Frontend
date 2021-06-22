import {authUser} from "../../../redux/reducers/user_reducer";
import {connect} from 'react-redux'
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import SignInForm from "./SignInFrom";

function SignInFormContainer({authUser}) {
    const primaryValue = {
        username: '',
        password: '',
    }

    const [value, setValue] = useState(primaryValue)
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [open, setOpen] = useState();

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => setOpen(undefined);

    const history = useHistory()

    async function authSubmit() {
        try {
            await authUser(value)
            history.push('/main')
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    return <SignInForm
        onSubmit={authSubmit}
        setValue={setValue}
        value={value}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        isOpen = {open}
        onOpen= {onOpen}
        onClose = {onClose}
    />
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {
    authUser,
})(SignInFormContainer)