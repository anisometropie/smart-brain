import React from 'react';
import { BACKEND_SERVER_URL } from 'constants.js';
import Profile from 'components/Profile';
import './css/Leaderboard.css'

class Leaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			route: 'loading',
			userID: props.userID,
			leaderboard: [],
			userToLook: ''
		}
	}

	onRouteChange(route, userToLook='') {
		this.setState( {route: route, userToLook: userToLook} );
	}

	componentDidMount() {
		const {userID} = this.state;
		let boardJSX;
		fetch(`${BACKEND_SERVER_URL}/leaderboard`, {
			method: 'get',
			headers: {'content-Type': 'application/json'}
		})
		.then(response => response.json())
		.then(response => {
			if ( typeof response === 'object') {
				boardJSX = response.map( (user, index) => {
					const date = (new Date(user.joined)).toString();
					const gmt = date.indexOf('GMT');
					console.log(userID, user.id)
					return (
						<tr key={index}
							className={userID === user.id ? 'user myself' : 'user'}
							onClick={ () => this.onRouteChange("profile", user.id) }>
							<td>{user.name}</td>
							<td>{user.entries}</td>
							<td>{date.substring(0,gmt)}</td>
						</tr>
					)
				});
				this.setState({
					leaderboard: boardJSX,
					route: 'leaderboard'
				});
			}
			else if (typeof response === 'string') {
				console.log(response);
			}
		});
	}

	render() {
		const { leaderboard, route, userToLook } = this.state;
		console.log(route);
		if (route === 'leaderboard') {
			return (
				<div id="leaderboard">
					<h2>Leaderboard</h2>
					<table id="userList">
						<tbody>
							<tr>
								<th>Name</th>
								<th>Entries</th>
								<th>Member since</th>
							</tr>
							{leaderboard}
						</tbody>
					</table>
				</div>
			);
		}
		else if (route === 'profile') {
			return(
				<div className="container">
					<Profile userID={userToLook}/>
					<input className="button" type="button" value="Back" onClick={ () => this.onRouteChange("leaderboard") }/>
				</div>
			);
		}
		else if(route === 'loading') {
			return(
				<div>Loading</div>
			);
		}
	}
}

export default Leaderboard;
