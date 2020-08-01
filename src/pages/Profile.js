import React from "react";


import './Profile.css';
import Header from '../Header'
import { UserContext } from "../UserProvider";
import {auth} from "../Firebase";

class ProfilePage extends React.Component {
    render () {
    const {photoURL, displayName, email} = (this.context || {});
return (
<>
    <Header />
    <div className = "medium-container">
        <div id="profileFlex">
            <div className="profileImg" style={{
                backgroundImage: `url(${this.context || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})`
            }}></div>
            <div>
                <h2 className="small-margin-bottom">{displayName}</h2>
                <p>{email}</p>
            </div>
        </div>
    <button onClick = {() => {auth.signOut()}}>Sign out</button>
    </div>
</>
) 
        }
};
ProfilePage.contextType = UserContext;
export default ProfilePage;