import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { auth, signInWithGoogle } from '../Firebase';

import Header from '../Header'
import { UserContext } from '../UserProvider';

export default function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    
    const user = useContext(UserContext);
    const userEmail = (user || {}).email;
    const redirect = null;

    function validate() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            setError("Error: " + error.message);
        });
    }
    if (userEmail !== undefined) {
        return <Redirect to="/profile" />
    }
    return (
        <>
        <Header />
        <div className="small-container">
            <h2>Login</h2>
            {error !== null && <div>{error}</div>}
            <form>
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
                <input id="signin" disabled={!validate()} className="bt margin-top" type="button" value="Login" onClick={handleSubmit} />
                <p className="small-margin-bottom">or</p>
                <input id="signinGoogle" className="bt" type="button" value="Login with Google" onClick={signInWithGoogle} />
                <p>Don't have an account?{" "}
                    <Link to="/signup">Sign up</Link>
                    <br />
                    <Link to="/password-reset">Forgot password?</Link>
                </p>
            </form>
        </div>
        </>
    );
}