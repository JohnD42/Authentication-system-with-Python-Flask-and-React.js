import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
    const navigate = useNavigate()
	const { store, actions } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.elements.inputUsername.value
        const password = e.target.elements.inputPassword.value
        const obj = {
            "username": username,
            "password": password
        }

            const json_obj = JSON.stringify(obj)

            const resp = await fetch('https://cautious-xylophone-q7q749vrr4vgf9xp-3001.app.github.dev/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: json_obj
            }
            )
            if(resp.ok) {
                const resp_json = await resp.json()
                console.log(resp_json)
                navigate('/private')
            }
        }

	return (
		<div className="text-center mt-5">
            <form onSubmit={e => {handleSubmit(e)}}>
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
