import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from './UserProvider';
import { PersonFill } from 'react-bootstrap-icons';

import './Header.css'

const Header = () => {
    const user = useContext(UserContext);
    const history = useHistory();
    const loggedIn = (
        <>
        <div className={"headerItem rightMenu"+(history.location.pathname === "/profile" ? " activeMenu" : "")} id="profileButton">
            <Link to="/profile">
                <PersonFill size={30}/>
            </Link>
        </div>
        </>
    );
    const loggedOut = (
        <>
        <div id="loginButton" className={"headerItem rightMenu"+(history.location.pathname === "/login" ? " activeMenu" : "")}>
            <Link to="/login">Login</Link>
        </div>
        <div id="signupButton" className={"headerItem rightMenu"+(history.location.pathname === "/signup" ? " activeMenu" : "")}>
            <Link to="/signup">Sign Up</Link>
        </div>
        </>
    );
    return (
        <div id="header">
            <div id="left">
                <div className="headerItem">
                    <Link to="/" id="homeLink"><span role="img" aria-label="flexed bicep">💪</span> workout timer</Link>
                </div>
            </div>
            <div id="right">
                {user !== undefined ? loggedIn : loggedOut}
            </div>
        </div>
    )
}

export default Header;