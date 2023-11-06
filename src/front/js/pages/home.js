import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	return (
		<div className="text-center mt-5 container">
			{ store.token === null ?
			<div className="row mt-3">
				<button className="btn btn-primary col-lg-6 mx-auto" onClick={() => navigate('/signup')}>
					Sign up!
				</button>  
			</div> : '' }
			{ store.token === null ?
			<div className="row mt-3">
				<button className="btn btn-primary col-lg-6 mx-auto" onClick={() => navigate('/login')}>
					Log in
				</button>
			</div> : '' }
			<div className="row mt-3">
				<button className="btn btn-primary col-lg-6 mx-auto" onClick={() => navigate('/private')}>
					User info page
				</button>
			</div>
		</div>
	);
};
