var React = require('react');
var firebase = require('firebase');

module.exports = React.createClass({

	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		return {
			error: false
		};
	},
	handleSubmit: function(e){
		e.preventDefault();
		var email = this.refs.email.value;
		var pw = this.refs.pw.value;
		var self = this;
		var that = this;
		var thisRouter = this.context.router;

		firebase.auth().signInWithEmailAndPassword(email, pw)
		.then(function(result){
			var location = self.props.location;
			if (location.state && location.state.nextPathname){
				thisRouter.replace(location.state.nextPathname);
			} else {
				thisRouter.replace('/dashboard'); //re-route to home page.
			}
			console.log('user signed in');
		}).catch(function(error){
			self.setState({error: error.message});
		});
	},
	render: function(){
		var errors = this.state.error ? <p>{this.state.error}</p> : '';

		return (
			<div>
				<h1 className="page-header">Account Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input className="form-control" ref="email" placeholder="email" />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" ref="pw" placeholder="password" />
					</div>
					{errors}
					<button type="submit" className="btn btn-primary">Log In</button>
				</form>
			</div>
		);
	}
});