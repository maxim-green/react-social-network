import classes from "./Header.module.scss";
import logoImg from "../../assets/images/logo.svg";
import searchIcon from "../../assets/images/search.svg";
import Logo from "../_shared/Logo/Logo";
import SearchInput from "../_shared/SearchInput/SearchInput";
import UserControl from "./UserControl/UserControl";
import React from "react";
import IconWithCounter from "../_shared/IconWithCounter/IconWithCounter";
import newFriendsIcon from '../../assets/images/notifications-friends.svg'
import newMessagesIcon from '../../assets/images/notifications-messages.svg'
import notificationsIcon from '../../assets/images/notifications-bell.svg'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/reducers/auth.reducer";
import {StateType} from "../../redux/store";

type MapStatePropsType = {
    authorized: boolean
    username: string | null
    avatar: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

type NativePropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & NativePropsType

const Header: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.header}>
            <div className={classes.row}>
                <Logo src={logoImg}/>
                <div className={classes.searchInput}>
                    <SearchInput icon={searchIcon}/>
                </div>
                {props.authorized && <div className={classes.userControl}>
                    <UserControl username={props.username} avatar={props.avatar} logout={props.logout}/>
                </div>}
                {props.authorized && <div className={classes.notificationArea}>
                    <NavLink to='/users/friends'><IconWithCounter src={newFriendsIcon} count={5}/></NavLink>
                    <NavLink to='/dialogs'><IconWithCounter src={newMessagesIcon} count={3}/></NavLink>
                    <NavLink to='/notifications'><IconWithCounter src={notificationsIcon} count={15}/></NavLink>
                </div>}
            </div>
        </div>
    )
}

const HeaderContainer: React.FC<PropsType> = (props) => <Header {...props} />

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        authorized: state.auth.authorized,
        username: state.auth.username,
        avatar: state.profile.data.avatar?.small
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, NativePropsType, StateType>(
    mapStateToProps,
    {logout}
)(HeaderContainer)