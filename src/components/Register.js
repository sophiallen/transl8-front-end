var React = require('react');
var firebase = require('firebase');


var Register = React.createClass({
	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		return {
			error: false
		}
	},
	handleSubmit: function(e){
		e.preventDefault();

		var email = this.refs.email.value;
		var pw =  this.refs.pw.value;
		var errorMsg = '';
		var that = this;

		//authenticated create via firebase
		firebase.auth().createUserWithEmailAndPassword(email,pw)
		.then(function(user){
			that.context.router.replace('/setup'); //re-route to account setup
		})
		.catch(function(error){
				that.setState({error: error.message});
		});
	},
	render: function(){
		//display error message, if any
		var errors = this.state.error ? <p>{this.state.error}</p> : '';
		
		return (
			<div>
				<h2>Register</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input className="form-control" ref="email" placeholder="email" />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" ref="pw" placeholder="password" />
					</div>
					<div className="form-group">
						<label>Confirm Password</label>
						<input type="password" className="form-control" placeholder="retype password" />
					</div>
					{errors}
					<button type="submit" className="btn btn-primary">Register!</button>
				</form>
			</div>
		);
	}
});

module.exports = Register;