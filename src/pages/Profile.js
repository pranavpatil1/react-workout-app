import React from "react";
import './Profile.css';
import Header from '../Header'

const ProfilePage = () => {
return (
<>
    <Header />
    <div className = "medium-container">
        <div id="profileFlex">
            <div className="profileImg"></div>
            <div>
                <h2 className="small-margin-bottom">Pranav</h2>
                <p>4pranavpatil@gmail.com</p>
            </div>
        </div>
    <button>Sign out</button>
    </div>
</>
) 
};
export default ProfilePage;