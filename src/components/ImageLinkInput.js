import React from 'react';
import './css/ImageLinkInput.css'

function ImageLinkInput( {inputValue, onPictureSubmit, onChange} ) {
	return (
		<div id="imageLinkContainer">
			<p>Face Recognition</p>
			<div id="urlInput">
				<input id="imageURL" type="text" placeholder="paste URL" value={inputValue} onChange={onChange}/>
				<button onClick={onPictureSubmit}>Detect</button>
			</div>
		</div>
	);
}

export default ImageLinkInput;
