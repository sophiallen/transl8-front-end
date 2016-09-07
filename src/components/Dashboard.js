var React = require('react');
var firebase = require('firebase');
var EditableText = require('./dashboard/EditableText.js');

var dashboard = React.createClass({
	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		console.log('in dash getInitial, user: ' + this.props.currentUser);
		return {
			userDetails: this.props.userDetails
		};
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
				}
			});
		} 
	},
	update: function(newDetailData, keyName){
		var details = this.state.userDetails;
		details[keyName] = newDetailData;
		this.setState({userDetails: details});

		var updates = {};
		updates['/users/' + this.props.currentUser.uid + '/' + keyName] = newDetailData;
		var that = this;
		firebase.database().ref().update(updates).then(function(response){
			that.props.onChange(details);
		});
	},
	render: function(){
		return (
			<div>
				<h1 className="page-header">User Dashboard</h1>
				<h4>{this.state.userDetails.userName || 'loading'}</h4>
				<EditableText title="Name" placeHolder={this.state.userDetails.userName} keyName="userName" onChange={this.update} />
				<EditableText title="Phone Number" placeHolder={this.state.userDetails.phone} keyName="phone" onChange={this.update} />

			</div>
		);
	}
});

module.exports = dashboard;