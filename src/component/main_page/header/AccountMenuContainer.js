import React, {useEffect, useState} from "react";
import {selectUserData} from "../../../redux/selectors/selectors";
import {connect} from 'react-redux'
import {loadUser, userLogout} from "../../../redux/reducers/user_reducer";
import AccountMenu from "./AccountMenu";
import {useHistory} from "react-router-dom";
import {getUsernameFromCookie} from "../../../utils/cookiesUtils";

function AccountMenuContainer({userData, userLogout, loadUser}) {
    const [open, setOpen] = useState()
    const [hasData, setData] = useState(false)

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

    useEffect(() => {
        if (!hasData) {
            loadUser(getUsernameFromCookie())
            setData(true)
        }
    })

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
    userLogout,
    loadUser
})(AccountMenuContainer)