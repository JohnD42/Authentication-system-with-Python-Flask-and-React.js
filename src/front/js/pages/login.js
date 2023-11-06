import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
    const navigate = useNavigate()
	const { store, actions } = useContext(Context);
    const [failedLogin, setFailedLogin] = useState(false)

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
                setFailedLogin(false)
                const resp_json = await resp.json()
                console.log(resp_json.token)
                actions.setToken(resp_json.token)
                console.log(store.token)
                document.cookie = `token=${resp_json.token}`
                navigate('/')
            }
            else {
                setFailedLogin(true)
            }
        }

	return (
		<div className="mt-5">
            <form onSubmit={e => {handleSubmit(e)}}>
                <div className="container">
                    <div className="form-group col-lg-6 p-2 mx-auto">
                        <label htmlFor="inputUsername">Username</label>
                        <input type="text" className="form-control" id="inputUsername" aria-describedby="username" placeholder="Enter username"/>
                    </div>
                    {failedLogin ? 
                        <div className="alert alert-danger">
                            "Invalid username or password."
                        </div> : ''}
                    <div className="form-group col-lg-6 p-2 mx-auto">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                    </div>
                    <div className="col-lg-6 p-2 mx-auto">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
		</div>
	);
};
