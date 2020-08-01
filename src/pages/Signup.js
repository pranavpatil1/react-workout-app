import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header'

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    function validate() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <>
        <Header />
        <div className="small-container">
            <h2>Sign Up</h2>
            <form>
                <label htmlFor="name">Display Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="John Smith"
                        value = {displayName}
                        onChange={e => setDisplayName(e.target.value)} />
                
                <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="example@gmail.com"
                        value = {email}
                        onChange={e => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password" 
                    name="password" 
                    value = {password}
                    onChange={e => setPassword(e.target.value)}/>
                <input id="signin" disabled={!validate()} className="bt margin-top" type="button" value="Sign up" />
                <p className="small-margin-bottom">or</p>
                <input id="signinGoogle" className="bt" type="button" value="Sign up with Google" />
                <p>Want to <Link to="/login">login</Link> instead?{" "}
                    
                </p>
            </form>
        </div>
        </>
    );
}
