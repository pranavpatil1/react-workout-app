import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from './UserProvider';

import './Header.css'

const Header = () => {
    const user = useContext(UserContext);
    const history = useHistory();
    const loggedIn = (
        <div className={"headerItem rightMenu"+(history.location.pathname === "/profile" ? " active" : "")} id="profileButton">
            <Link to="/profile">
                <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
            </Link>
        </div>
    );
    const loggedOut = (
        <>
        <div id="loginButton" className={"headerItem rightMenu"+(history.location.pathname === "/login" ? " active" : "")}>
            <Link to="/login">Login</Link>
        </div>
        <div id="signupButton" className={"headerItem rightMenu"+(history.location.pathname === "/signup" ? " active" : "")}>
            <Link to="/signup">Sign Up</Link>
        </div>
        </>
    );
    return (
        <div id="header">
            <div id="left">
                <div className="headerItem">
                    <Link to="/" id="homeLink">workout timer</Link>
                </div>
            </div>
            <div id="right">
                {user !== undefined ? loggedIn : loggedOut}
            </div>
        </div>
    )
}

export default Header;