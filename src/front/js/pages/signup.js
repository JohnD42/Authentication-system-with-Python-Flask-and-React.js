import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Signup = () => {
    const navigate = useNavigate()
	const { store, actions } = useContext(Context);

    const [failedPassword, setFailedPassword] = useState(false)
    const [failedEmail,setFailedEmail] = useState(false)
    const [failedUser, setFailedUser] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault();
        const email = e.target.elements.inputEmail.value
        const username = e.target.elements.inputUsername.value
        const password = e.target.elements.inputPassword.value
        const obj = {
            "email": email,
            "username": username,
            "password": password
        }

        let number = false
        let upper = false
        let lower = false
        let nonAlphanumeric = false

        for (let i = 0, len = password.length; i < len; i++) {
            const code = password.charCodeAt(i);
            if (code > 47 && code < 58) {
                // numeric (0-9)
                number = true
            }
            else if (code > 64 && code < 91) {
                // upper alpha (A-Z)
                upper = true
            }
            else if (code > 96 && code < 123) { 
                // lower alpha (a-z)
              lower = true
            }
            else {
                nonAlphanumeric = true
            }
        }

        if (number && upper && lower && nonAlphanumeric && password.length >= 8) {
            const json_obj = JSON.stringify(obj)

            const resp = await fetch('https://cautious-xylophone-q7q749vrr4vgf9xp-3001.app.github.dev/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: json_obj
            }
            )
            if(resp.ok) {
                setFailedUser(false)
                setFailedEmail(false)
                setFailedPassword(false)
                console.log(await resp.json())
                navigate('/login')
            }
            else {
                console.log(resp.json())
            }
            if(resp.msg.contains("Username already in use")) {
                setFailedUser(true)
            }
            if(resp.msg.contains("Email already in use")) {
                setFailedEmail(true)
            }
        }
        else {
            setFailedPassword(true)
        }
    }

	return (
		<div className="mt-5">
            <form onSubmit={e => {handleSubmit(e)}}>
                <div className="container">
                    <div className="form-group col-lg-6 p-2 mx-auto">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    {failedEmail ? 
                        <div className="alert alert-danger">
                            "Email already in use."
                        </div> : ''}
                    <div className="form-group col-lg-6 p-2 mx-auto">
                        <label htmlFor="inputUsername">Username</label>
                        <input type="text" className="form-control" id="inputUsername" aria-describedby="username" placeholder="Enter username"/>
                    </div>
                    {failedUser ? 
                        <div className="alert alert-danger">
                            "Username already in use."
                        </div> : ''}
                    <div className="form-group col-lg-6 p-2 mx-auto">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                    </div>
                    {failedPassword ? 
                        <div className="alert alert-danger">
                            "Your password must contain at least one number, one capital letter, one lowercase letter, and one non-alphanumeric character (e.g. @, #, $, !, % etc.), and must be at least 8 characters long."
                        </div> : ''}
                    <div className="col-lg-6 p-2 mx-auto">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
		</div>
	);
};
