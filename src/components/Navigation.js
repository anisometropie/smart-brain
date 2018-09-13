import React from 'react';
import './css/Navigation.css';

function Navigation( {route, onRouteChange} ) {
	return (
		<nav id="navbar">
			{
				route === "signin"	 ?	<p onClick={ () => onRouteChange("register") } className='f3 link dim black underline pa3 pointer'>Register</p> :
				route === "register" ?	<p onClick={ () => onRouteChange("signin") } className='f3 link dim black underline pa3 pointer'>Sign in</p>	:
										<p onClick={ () => onRouteChange("signout") } className='f3 link dim black underline pa3 pointer'>Sign out</p> 	
			}
		</nav>
	);
}

export default Navigation;
