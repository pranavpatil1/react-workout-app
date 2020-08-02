import React, { useContext } from "react";


import './Profile.css';
import Header from '../Header'
import { UserContext } from "../UserProvider";
import {auth} from "../Firebase";
import { Redirect } from "react-router-dom";

const ProfilePage = () => {
    const user = useContext(UserContext);
    const {photoURL, displayName, email} = (user || {});
    if (email === undefined) {
        return <Redirect to="/login" />
    }
    return (
    <>
        <Header />
        <div className = "small-container">
            <div id="profileFlex">
                <div className="profileImg" style={{
                    backgroundImage: `url(${photoURL || 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg'})`
                }}></div>
                <div>
                    <h2 className="small-margin-bottom">{displayName}</h2>
                    <p>{email}</p>
                    <button onClick = {() => {auth.signOut()}}>Sign out</button>
                </div>
            </div>
        </div>
    </>
    ) 
};
export default ProfilePage;