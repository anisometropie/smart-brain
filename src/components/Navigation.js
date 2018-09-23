import React from 'react';
import Logo from 'components/Logo'
import './css/Navigation.css';

function Navigation( {route, onRouteChange} ) {
	return (
		<nav id="navbar">
			<div id="title" onClick={ () => onRouteChange("home")} >
				<Logo />
				<h1>Smart Brain</h1>
			</div>
			{
				route === "signin"		?
					<div id="links">
						<p onClick={ () => onRouteChange("register") } >Register</p>
					</div>
				:
				route === "register"	?
					<div id="links">
						<p onClick={ () => onRouteChange("signin") } >Sign in</p>
					</div>
				:
					<div id="links">
						<p onClick={ () => onRouteChange("profile") } >Profile</p>
						<p onClick={ () => onRouteChange("leaderboard") } >Leaderboard</p>
						<p onClick={ () => onRouteChange("signout") } >Sign out</p>
					</div>
			}
		</nav>
	);
}

export default Navigation;
