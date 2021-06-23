import React, {useState} from 'react'
import {connect} from 'react-redux'
import {authUser, regUser} from '../../../redux/reducers/user_reducer'
import {useHistory} from 'react-router-dom'
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

    const history = useHistory()

    async function registerSubmit() {
        try {
            await regUser(value)
            await authUser({
                username: value.username,
                password: value.password
            })
            history.push('/main')
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