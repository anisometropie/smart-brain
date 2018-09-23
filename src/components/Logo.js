import React from 'react';
import Tilt from 'react-tilt'
import './css/Logo.css';
import brain from 'images/brain.png';

function Logo() {
	return (
		<div>
			<Tilt className="Tilt br2" options={{ max : 25 }} >
				<div className="Tilt-inner">
					<img src={brain} alt="logo"/>
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;
