import React from 'react';
import { BACKEND_SERVER_URL } from 'constants.js';
import './css/Profile.css'

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			route: 'loading',
			userID: props.userID,
			user: {
				id:'',
				name: '',
				email: '',
				entries: 0,
				joined: null
			}
		}
	}

	componentDidMount() {
		const {userID} = this.state;
		fetch(`${BACKEND_SERVER_URL}/profile/${userID}`, {
			method: 'get',
			headers: {'content-Type': 'application/json'}
		})
		.then(response => response.json())
		.then(response => {
			if ( typeof response === 'object') {
				this.setState({
					user: response,
					route: 'profile'
				});
			}
			else if (typeof response === 'string') {
				console.log(response);
			}
		});
	}

	render() {
		const { leaderboard, user, route } = this.state;
		if (route === 'profile') {
			return (
				<div id="profile">
					<h2 className="title">Profile</h2>
					<div>
						<p className='field'>User ID</p>
						<p className='fieldValue'>{user.id}</p>
					</div>
					<div>
						<p className='field'>Name</p>
						<p className='fieldValue'>{user.name}</p>
					</div>
					<div>
						<p className='field'>Email</p>
						<p className='fieldValue'>{user.email}</p>
					</div>
					<div>
						<p className='field'>Entries</p>
						<p className='fieldValue'>{user.entries}</p>
					</div>
					<div>
						<p className='field'>Joined</p>
						<p className='fieldValue'>{user.joined}</p>
					</div>
				</div>
			);
		}
		else {
			return (
				<div>Loading</div>
			);
		}
	}
}

export default Profile;
