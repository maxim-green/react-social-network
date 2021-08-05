import classes from "./Header.module.scss";
import logoImg from "../../assets/images/logo.svg";
import searchIcon from "../../assets/images/search.svg";
import Logo from "../common/Logo/Logo";
import SearchInput from "../common/SearchInput/SearchInput";
import UserControl from "./UserControl/UserControl";
import React from "react";
import IconWithCounter from "../common/IconWithCounter/IconWithCounter";
import newFriendsIcon from '../../assets/images/notifications-friends.svg'
import newMessagesIcon from '../../assets/images/notifications-messages.svg'
import notificationsIcon from '../../assets/images/notifications-bell.svg'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth.reducer";

const Header = (props) => {
    return (
        <div className={classes.header}>
                <div className={classes.row}>
                    <Logo src={logoImg}/>
                    <div className={classes.searchInput}>
                        <SearchInput icon={searchIcon}/>
                    </div>
                    {props.authorized && <div className={classes.userControl}>
                        <UserControl userName={props.username} logout={props.logout}/>
                    </div>}
                    {props.authorized && <div className={classes.notificationArea}>
                        <NavLink to='/friends'><IconWithCounter src={newFriendsIcon} count={5}/></NavLink>
                        <NavLink to='/dialogs'><IconWithCounter src={newMessagesIcon} count={3}/></NavLink>
                        <NavLink to='/notifications'><IconWithCounter src={notificationsIcon} count={15}/></NavLink>
                    </div>}
                </div>
        </div>
    )
}

const HeaderContainer = (props) => {
    return (
        <Header {...props} />
    )
}

const mapStateToProps = (state) => {
    return {
        authorized: state.auth.authorized,
        username: state.auth.username
    }
}

export default connect(mapStateToProps, {logout})(HeaderContainer)