import React from 'react';
import { BACKEND_SERVER_URL } from 'constants.js';
import './css/Leaderboard.css'

class Leaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: props.userID,
			leaderboard: []
		}
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
						<tr key={index} className={userID === user.id ? 'user myself' : 'user'}>
							<td>{user.name}</td>
							<td>{user.entries}</td>
							<td>{date.substring(0,gmt)}</td>
						</tr>
					)
				});
				this.setState({
					leaderboard: boardJSX
				});
			}
			else if (typeof response === 'string') {
				console.log(response);
			}
		});
	}

	render() {
		const { leaderboard } = this.state;
		return (
			<div id="history">
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
}

export default Leaderboard;
