import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header'
import { auth, generateUserDocument, signInWithGoogle } from "../Firebase";

export default function Signup () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    function validate() {
        return email.length > 0 && password.length > 0;
    }

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try{
          const {user} = await auth.createUserWithEmailAndPassword(email, password);
          console.log(user);
          generateUserDocument(user, {displayName});
        }
        catch(error){
            setError(error);
        }
    
        setEmail("");
        setPassword("");
        setDisplayName("");
      };

    return (
        <>
        <Header />
        <div className="small-container">
            <h2>Sign Up</h2>
            {error !== null && (
                <div>
                    {error}
                </div>
            )}
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
                <input id="signin" disabled={!validate()} className="bt margin-top" type="button" value="Sign up" onClick={(event) => {createUserWithEmailAndPasswordHandler(event, email, password)}} />
                <p className="small-margin-bottom">or</p>
                <input id="signinGoogle" className="bt" type="button" value="Sign up with Google" onClick={signInWithGoogle} />
                <p>Want to <Link to="/login">login</Link> instead?{" "}
                    
                </p>
            </form>
        </div>
        </>
    );
}