import React, { useState, useRef } from 'react';
import './user.css';
import CryptoJS from 'crypto-js';

export default function User() {

    let username = useRef("")
    let password = useRef("")
    let verifiedPassword = useRef("")
    let skills = useRef("")
    let [showSignIn, setShowSI] = useState(true)
    let [showError, setShowError] = useState("")

    const submitMethod = (event) => {
        event.preventDefault()
        let hashed = hashMethod(password.current.value)
        // check if hashed matches the stored password in database
    }

    const SUmethod = (event) => {
        setShowError("")
        event.preventDefault()
        if (password.current.value == verifiedPassword.current.value) {
            let hashed = hashMethod(password.current.value)
            // push to database
        } else {
            setShowError("Passwords do not match")
        }
        

    }

    const hashMethod = (password) => {
        const hashedPassword = CryptoJS.SHA256(password).toString();
        return hashedPassword
    }

    const changeSISU = () => {
        setShowSI(!showSignIn)
    }
    
    return(
        <div className = "body">
            {showSignIn &&
                <>
                    <form onSubmit = {submitMethod}>
                        <input type = "text" placeholder = "Type in username" ref = {username}></input>
                        <input type = "password" placeholder = "Type in password" ref = {password}></input>
                        <button type = "submit" className = "formButton"> Submit </button>
                    </form>

                    <button onClick = {changeSISU} > Or... Sign up </button>
                </>
            }

            {!showSignIn &&
                <>
                    <form onSubmit = {SUmethod}>
                        <input type = "text" placeholder = "Type in username" ref = {username}></input>
                        <input type = "password" placeholder = "Type in password" ref = {password}></input>
                        <input type = "password" placeholder = "Retype in password" ref = {verifiedPassword}></input>
                        <textarea className = "textArea" placeholder = "Type in your skillset             e.g (HTML, CSS, JS...)" ref = {skills}></textarea>
                        <button className = "formButton" type = "submit"> Submit </button>
                    </form>

                    <button onClick = {changeSISU} > Or... Sign In </button>
                </>
            }

            <div className = "error">{showError}</div>
        </div>
    )
}