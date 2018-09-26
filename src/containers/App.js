import React, { Component } from 'react';
import Navigation from 'components/Navigation';
// import Rank from 'components/Rank'
import Logo from 'components/Logo';
import ImageLinkInput from 'components/ImageLinkInput';
import FaceRecognition from 'components/FaceRecognition';
import Signin from 'components/Signin';
import Register from 'components/Register';
import History from 'components/History'
import Leaderboard from 'components/Leaderboard';
import Profile from 'components/Profile';
import { BACKEND_SERVER_URL } from 'constants.js';
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
	},
	logged: false,
	userHistory: []
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	resetState = () => {
		this.setState(initialState);
	}

	loadUser = ({userInfo, queries=[]}) => {
		this.setState({
			user: userInfo,
			logged: true,
			userHistory: queries
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

	onChange = (event) => {
		this.setState({input: event.target.value});
	}

	onThumbnailClick = (url) => {
		this.setState({
			input: url
		}, this.onPictureSubmit);
	}

	onPictureSubmit = () => {
		this.setState({boxes: []});
		this.setState({imageURL: this.state.input}, function() {
			fetch(`${BACKEND_SERVER_URL}/imageQuery`, {
				method: 'put',
				headers: { 'content-Type': 'application/json'},
				body: JSON.stringify( {
					id: this.state.user.id,
					imageURL: this.state.imageURL
				})
			})
			.then(response => response.json())
			.then(response => {
				const {entries, clarifaiResponse, lastQueries} = response;
				this.setState({
					user: Object.assign( this.state.user, {entries: entries} ),
					userHistory: lastQueries
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
		else if (route === 'home') {
			if (this.state.logged) {
				this.setState( {route: route} );
			}
			else {
				this.setState( {route: 'signin'} );
			}
		}
		else {
			this.setState( {route: route} );
		}
	}

	render() {
		const { imageURL, boxes, route, user, userHistory, input } = this.state;
		return (
			<div id="App">
				<Navigation route={route} onRouteChange={this.onRouteChange}/>
				{
					route === "register" ?
						<div id="mainContent">
							<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						</div>
					:
					route === "signin"	 ?
						<div id="mainContent">
							<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						</div>
					:
					route === "leaderboard"	 ?
						<div id="mainContent">
							<Leaderboard userID={user.id}/>
						</div>
					:
					route === "profile"	 ?
						<div id="mainContent">
							<Profile userID={user.id}/>
						</div>
					:
					<div id="pageBody">
						<aside id="sideBar">
							<History userHistory={userHistory} onThumbnailClick={this.onThumbnailClick}/>
						</aside>
						<div id="mainContent">
							<ImageLinkInput inputValue={input} onChange={this.onChange} onPictureSubmit={this.onPictureSubmit}/>
							<FaceRecognition imageURL={imageURL} boxes={boxes}/>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default App;
