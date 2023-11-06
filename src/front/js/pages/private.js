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
                    const resp_json = await resp.json()
                    await actions.setUserData(resp_json.user)
                    clearInterval(interval)
                }
            }
            else {
                alert("You must be logged in to see this page.")
                navigate('/login')
            }
        }
        const interval = setInterval(() => { 
            asyncFunc() 
        }, 500)
        return () => clearInterval(interval); 
    },[])

    return (
        <div>
            {store.userData !== null ?
                Object.keys(store.userData).forEach(key => {
                    console.log(key)
                    return (
                        <div>
                            <p>{`${key}: ${store.userData[key]}`} </p>
                        </div>
                        )})
                : ''
            }
        </div>
    )

}