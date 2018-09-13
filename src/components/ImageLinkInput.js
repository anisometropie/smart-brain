import React from 'react';
import './css/ImageLinkInput.css'

function ImageLinkInput( {onPictureSubmit, onInput} ) {
	return (
		<div id="imageLinkContainer">
			<p>Type images URL</p>
			<div id="urlInput">
				<input id="imageURL" type="text" onInput={onInput}/>
				<button onClick={onPictureSubmit}>Detect</button>
			</div>
		</div>
	);
}

export default ImageLinkInput;
