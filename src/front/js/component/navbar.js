import React, { useContext, } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);

	const signOut = () => {
		sessionStorage.removeItem("token")
		actions.removeToken()
		navigate('/')
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-between">
				<Link to="/" style={{ textDecoration: 'none' }}>
					<span className="navbar-brand mb-0 h1">Generic Social Media</span>
				</Link>
				{ store.token !== null ?
				<button className="btn btn-primary" onClick={() => signOut()}>Sign out!</button> : ''
				}
			</div>
		</nav>
	);
};
