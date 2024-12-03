import React, { useState, useRef, useEffect } from 'react';
import './user.css';
import CryptoJS from 'crypto-js';
import axios from 'axios'
const Post = require('./posttest')

export default function User() {
    let username = useRef("")
    let password = useRef("")
    let verifiedPassword = useRef("")
    let skills = useRef("")
    let [showSignIn, setShowSI] = useState(true)
    let [showError, setShowError] = useState("")
    let [users, setUsers] = useState([{}])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/users')
    //             setUsers(response.data)
    //         } catch (error) {
    //             console.error('Error fetching users:', error)
    //         }
    //     };

    //     fetchData()
    // }, [])
    

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
            addUser(username.current.value, hashed, skills.current.value)
            // push to database
        } else {
            setShowError("Passwords do not match")
        }
    }

    const addUser = async (user, pass, skills) => {
        let formData = {"username":user,"password":pass,"skillset":skills}
        try {
            const response = await fetch("http://localhost:3003/api/Passwords", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            console.log(response)
            if (response.ok) {
              console.log("Form submitted successfully");
            } else {
              console.log("Form submission failed");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };

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