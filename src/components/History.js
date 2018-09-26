import React from 'react';
import { BACKEND_SERVER_URL } from 'constants.js';
import './css/History.css'


class History extends React.Component {
	constructor(props) {
		super(props);
		const historyJSX = this.parseHistoryResponse(this.props.userHistory);
		this.state = {
			route: 'userHistory',
			generalHistoryJSX: [],
			userHistoryJSX: historyJSX
		}
	}

	parseHistoryResponse(history) {
		let historyJSX = history.map( (query, index) => {
			return (
				<div key={index} className="thumbnail">
					<img src={query.url} alt="query thumbnail" onClick={(event) => {
						this.props.onThumbnailClick(query.url);
					}}/>
				</div>
			)
		});
		return historyJSX;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.userHistory !== this.props.userHistory) {
			console.log('did update')
			const historyJSX = this.parseHistoryResponse(this.props.userHistory);
			this.setState({
				userHistoryJSX: historyJSX
			});
		}
	}

	fetchGeneralHistory() {
		const {userID} = this.state;
		let boardJSX;
		fetch(`${BACKEND_SERVER_URL}/generalHistory`, {
			method: 'get',
			headers: {'content-Type': 'application/json'}
		})
		.then(response => response.json())
		.then(response => {
			const historyJSX = this.parseHistoryResponse(response);
			this.setState({
				generalHistoryJSX: historyJSX
			});
		})
		.catch(console.log);
	}

	onRouteChange(route) {
		if (route === 'generalHistory') {
			this.fetchGeneralHistory();
		}
		this.setState({
			route: route
		});
	}

	render() {
		const { userHistoryJSX, generalHistoryJSX, route } = this.state;
		if (route === 'userHistory') {
			return (
				<div id="historyContainer">
					<div id="historyTabs">
						<input onClick={ () => this.onRouteChange('generalHistory') } type="button" value="All Queries"/>
						<input className="selected" type="button" value="Your Queries"/>
					</div>
					<div id="thumbnailBox">
						{userHistoryJSX}
					</div>
				</div>
			);
		}
		else if (route === 'generalHistory') {
			return(
				<div id="historyContainer">
					<div id="historyTabs">
						<input onClick={ () => this.onRouteChange('generalHistory') } className="selected" type="button" value="All Queries"/>
						<input onClick={ () => this.onRouteChange('userHistory') } type="button" value="Your Queries"/>
					</div>
					<div id="thumbnailBox">
						{generalHistoryJSX}
					</div>
				</div>
			);
		}
	}
}

export default History;
