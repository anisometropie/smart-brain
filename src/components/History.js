import React from 'react';
import './css/History.css'

function History({userHistory, onThumbnailClick}) {
	let historyJSX = userHistory.map( (query, index) => {
		return (
			<div key={index} className="thumbnail">
				<img src={query.url} alt="query thumbnail" onClick={(event) => {
					onThumbnailClick(query.url);
				}}/>
			</div>
		)
	});
	return (
		<div id="history">
			<h2>Last queries</h2>
			<div id="thumbnailBox">
				{historyJSX}
			</div>
		</div>
	);
}

export default History;
