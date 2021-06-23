import React, {useState} from 'react'
import {connect} from 'react-redux'
import {regUser} from '../../../redux/reducers/user_reducer'
import SignUpForm from "./SignUpForm";

function SignUpContainer({regUser}) {

    const primaryValue = {
        username: '',
        password: '',

        firstName: '',
        lastName: '',
        email: '',
    }

    const [value, setValue] = useState(primaryValue)
    const [errorMessage, setErrorMessage] = useState(undefined)

    async function registerSubmit() {
        try {
            await regUser(value)
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    return <SignUpForm
        onSubmit={registerSubmit}
        setValue={setValue}
        value={value}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
    />
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {
    regUser,
})(SignUpContainer)