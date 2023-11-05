import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Signup = () => {
    const navigate = useNavigate()
	const { store, actions } = useContext(Context);

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
                console.log(await resp.json())
                navigate('/')
            }
        }
        else {
            alert("Your password must contain at least one number, one capital letter, one lowercase letter, and one non-alphanumeric character (e.g. @, #, $, !, % etc.), and must be at least 8 characters long.")
        }
    }

	return (
		<div className="text-center mt-5">
            <form onSubmit={e => {handleSubmit(e)}}>
            <div class="form-group">
                <label for="inputEmail">Email address</label>
                <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="inputUsername">Username</label>
                <input type="text" class="form-control" id="inputUsername" aria-describedby="username" placeholder="Enter username"/>
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" id="inputPassword" placeholder="Password"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
		</div>
	);
};
