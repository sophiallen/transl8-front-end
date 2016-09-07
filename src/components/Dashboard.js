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
		if (details) {
			return (
				<div>
					<h4>User Name: {details.userName}</h4>
					<h4>Phone Number: {details.phone}</h4>
					<h4>Default 'From' Language: {details.defaultFrom}</h4>
					<h4>Default 'To' Language: {details.defaultTo}</h4>
					<button className="btn btn-primary" onClick={this.edit}>Edit Preferences</button>
				</div>
			)
		} else {
			return (<h4>Loading details...</h4>);
		}

	},
	edit: function(){
		this.setState({showForm: true});
	},
	renderForm: function(){
		return (<UserDataForm user={this.props.currentUser} userDetails={this.props.userDetails}/>);
	},
	render: function(){
		var child;
		if (this.state.showForm){
			child = this.renderForm();
		} else {
			child = this.renderDisplay();
		}

		return (
			<div>
				<h1 className="page-header">User Dashboard</h1>
				{child}
			</div>
		);
	}
});

module.exports = dashboard;