import React from 'react';
import './css/FaceRecognition.css';

function FaceRecognition( {imageURL, boxes} ) {
	const boxesDiv = boxes.map( function(box, index) {
		return <div key={index} className="box" style={{ top: box.top_row, right: box.right_col, bottom: box.bottom_row , left: box.left_col}}></div>
	});
	return (
		<nav id="image">
			<img src={imageURL} alt={imageURL} width="500px" height="auto"/>
			{boxesDiv}
		</nav>
	);
}

export default FaceRecognition;
