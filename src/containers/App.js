import React, { Component } from 'react';
import Navigation from 'components/Navigation';
import Rank from 'components/Rank'
import Logo from 'components/Logo';
import ImageLinkInput from 'components/ImageLinkInput';
import FaceRecognition from 'components/FaceRecognition';
import Signin from 'components/Signin';
import Register from 'components/Register';
import './App.css';

const initialState = {
	input: "",
	imageURL: "",
	boxes: [],
	route: "signin",
	user: {
		id: 0,
		name: '',
		email: '',
		entries: 0,
		joined: null
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	resetState = () => {
		this.setState(initialState);
	}

	loadUser = (newUser) => {
		this.setState({
			user: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				entries: newUser.entries,
				joined: newUser.joined
			}
		});
	}

	displayBoxes = (response) => {
		if (response.outputs[0].data.regions) {
			let regions = response.outputs[0].data.regions.map( function(region) {
				let box = region.region_info.bounding_box;
				box.right_col = 1 - box.right_col;
				box.bottom_row = 1 - box.bottom_row;
				Object.keys(box).forEach( key => box[key] = box[key]*100 + "%");
				return box;
			});
			this.setState({boxes: regions});
		}
	}

	onInput = (event) => {
		this.setState({input: event.target.value});
	}

	onPictureSubmit = () => {
		this.setState({boxes: []});
		this.setState({imageURL: this.state.input}, function() {
			fetch('https://frozen-plateau-32463.herokuapp.com/imageQuery', {
				method: 'put',
				headers: { 'content-Type': 'application/json'},
				body: JSON.stringify( {
					id: this.state.user.id,
					imageURL: this.state.imageURL
				})
			})
			.then(response => response.json())
			.then(response => {
				const [count, clarifaiResponse] = response;
				this.setState({
					user: Object.assign( this.state.user, {entries: count} )
				});
				this.displayBoxes(clarifaiResponse);
			})
			.catch(console.log);
		});
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.resetState();
			this.setState( {route: 'signin'} );
		}
		else {
			this.setState( {route: route} );
		}
	}

	render() {
		const { imageURL, boxes, route, user } = this.state;
		return (
			<div className="App">
				<Navigation route={route} onRouteChange={this.onRouteChange}/>
				{
					route === "register" ?
						<div id="mainContainer">
							<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						</div> :
					route === "signin"	 ?
						<div id="mainContainer">
							<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						</div> :
						<div id="mainContainer">
							<Rank name={user.name} entries={user.entries}/>
							<Logo />
							<ImageLinkInput onInput={this.onInput} onPictureSubmit={this.onPictureSubmit}/>
							<FaceRecognition imageURL={imageURL} boxes={boxes}/>
						</div>
				}
			</div>
		);
	}
}

export default App;

// "https://samples.clarifai.com/metro-north.jpg"
