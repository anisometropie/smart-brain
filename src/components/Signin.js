import React from 'react';

// function Signin( {onRouteChange} ) {
class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			error: ''
		}
	}

	onEmailChange = (event) => {
		this.setState( {signInEmail: event.target.value} );
	}

	onPasswordChange = (event) => {
		this.setState( {signInPassword: event.target.value} );
	}

	onSubmitSignin = (event) => {
		event.preventDefault();
		fetch('http://frozen-plateau-32463.herokuapp.com/signin', {
			method: 'post',
			headers: { 'content-Type': 'application/json'},
			body: JSON.stringify( {
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(response => {
			if ( typeof response === 'object') {
				this.props.loadUser(response);
				this.props.onRouteChange('home');
			}
			else if (typeof response === 'string') {
				this.setState( {error: response} );
			}
		});
	}

	render() {
		const { onRouteChange } = this.props;
		let error = this.state.error.length > 0 ? this.state.error : "";
		return (
			<main className="pa4 br3 ba">
				<form className="measure center">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						<legend className="f4 fw6 ph0 mh0">Sign In</legend>
						<div className="mt3">
							<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
							<input className="pa2 input-reset ba bg-transparent w-100"
								type="email"
								name="email-address"
								id="email-address"
								onChange={this.onEmailChange}
							/>
						</div>
						<div className="mv3">
							<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
							<input className="b pa2 input-reset ba bg-transparent w-100"
								type="password"
								name="password"
								id="password"
								onChange={this.onPasswordChange}
							/>
						</div>
					</fieldset>
					<div>{error}</div>
					<div className="">
						<input
							className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
							type="submit"
							value="Sign in"
							onClick={this.onSubmitSignin}
						/>
					</div>
					<div className="lh-copy mt3">
						<p href="#0" className="f6 link dim black db pointer" onClick={ () => onRouteChange("register") }>Register</p>
					</div>
				</form>
			</main>
		);
	}
}

export default Signin;
