import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Private = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const asyncFunc = async () => {
            if(store.token !== null) {
                const resp = await fetch('https://cautious-xylophone-q7q749vrr4vgf9xp-3001.app.github.dev/api/private', {
                        method: "GET",
                        headers: {
                            "Authorization": 'Bearer ' + store.token
                        }
                    })
                if (resp.ok) {
                    if(store.userData === null) {
                        const resp_json = await resp.json()
                        await actions.setUserData(resp_json.user)
                        Object.keys(store.userData).forEach((key) => {
                            actions.addKey(key)
                            actions.addValue(store.userData[key])
                        })
                    }
                }
                else {
                    alert("You must be logged in to see this page.")
                    navigate('/login')
                }
            }
            else {
                alert("You must be logged in to see this page.")
                navigate('/login')
            }
        }
        setTimeout(() => {
            asyncFunc() }, 500)
        },[])

    return (
        <div className="container mx-auto">
            <div className="row mx-auto p-5">
                <h1>Super secret private user data!</h1>
            </div>
            <div className="row mx-auto p-5">
                {store.values.length > 0 ? 
                    store.keys.map((key, ind) => {
                        return (
                            <div>
                                <p>{`${key}: ${store.values[ind]}`}</p>
                            </div>
                        )
                    })
                    : ''
                }
            </div>
        </div>
    )

}