var React = require('react');
var firebase = require('firebase');
var UserDataForm = require('./dashboard/UserDataForm.js');

var dashboard = React.createClass({
	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		console.log('in dash getInitial, user: ' + this.props.currentUser);
		return {showForm: false, userDetails: null};
	},
	componentWillMount: function(){
		//small optimization: check to see if redirected from login as check for login status.
		var justLoggedIn = (this.props.location.state && this.props.location.state.loggedIn);

		if (!this.props.loggedIn && !justLoggedIn) {
			var thisRouter = this.context.router;
			var that = this;

			firebase.auth().onAuthStateChanged(firebaseUser => { 
				if (firebaseUser === null){
					//re-route to login page.
					thisRouter.push({
						pathname: '/login',
						state: {fromPage: '/dashboard'}
					});
				} else {
					console.log('in dash will mount, user logged in');
					this.getUserDetails(firebaseUser.uid);
				}
			});
		} 
	},
	renderDisplay: function(){
		var details = this.props.userDetails;
		return (
			<div>
				<h4>User Name: {details.userName}</h4>
				<h4>Phone Number: {details.phone}</h4>
				<h4>Default 'From' Language: {details.defaultFrom}</h4>
				<h4>Default 'To' Language: {details.defaultTo}</h4>
			</div>
		)
	},
	render: function(){
		// var child = this.state.showForm? <UserDataForm user={this.props.currentUser}/> : 'User Data View';
		return (
			<div>
				<h1 className="page-header">User Dashboard</h1>
				<h4>Welcome, {this.props.userDetails? this.props.userDetails.userName : 'unknown user'}</h4>
				<UserDataForm user={this.props.currentUser}/>
			</div>
		);
	}
});

module.exports = dashboard;