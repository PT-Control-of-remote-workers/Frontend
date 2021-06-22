import React, {useState} from "react";
import {selectUserData} from "../../../redux/selectors/selectors";
import {connect} from 'react-redux'
import {authUser, loadUser, userLogout} from "../../../redux/reducers/user_reducer";
import AccountMenu from "./AccountMenu";
import {useHistory} from "react-router-dom";

function AccountMenuContainer({userData, userLogout}) {
    const [open, setOpen] = useState()

    const history = useHistory()

    const onOpen = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
    }

    async function logoutAction() {
        await userLogout()
        history.push('/sign_page')
    }
    return (
        <AccountMenu
            onOpen = {onOpen}
            onClose = {onClose}
            isOpen = {open}
            userData = {userData}
            onLogout = {logoutAction}
        />
    )
}

function mapStateToProps(state) {
    return {
        userData: selectUserData(state),
    }
}

export default connect(mapStateToProps, {
    userLogout
})(AccountMenuContainer)