import React from 'react';
import './css/Rank.css'

function Rank( {name, entries} ) {
	return (
		<div id="rank">
			{`${name}, your current entry count is…`}
			<div id="rankNumber">{entries}</div>
		</div>
	);
}

export default Rank;
