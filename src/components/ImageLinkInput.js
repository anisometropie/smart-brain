import React from 'react';
import './css/ImageLinkInput.css'

function ImageLinkInput( {inputValue, onPictureSubmit, onChange} ) {
	return (
		<div id="imageLinkContainer">
			<p>Type images URL</p>
			<div id="urlInput">
				<input id="imageURL" type="text" value={inputValue} onChange={onChange}/>
				<button onClick={onPictureSubmit}>Detect</button>
			</div>
		</div>
	);
}

export default ImageLinkInput;
