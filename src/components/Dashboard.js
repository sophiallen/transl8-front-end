var React = require('react');
var firebase = require('firebase');
var EditableText = require('./dashboard/EditableText.js');
var EditableDropDown = require('./dashboard/EditableSelect.js');
var langData = require('./../data/languages.js');

var dashboard = React.createClass({
	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired,
		userData: React.PropTypes.object
	},
	getInitialState: function(){
		return {};
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
		var details = this.context.userData;
		details[keyName] = newDetailData;

		var updates = {};
		updates['/users/' + this.props.currentUser.uid + '/' + keyName] = newDetailData;
		var that = this;

		this.props.onChange(details);

		firebase.database().ref().update(updates).then(function(response){
			console.log('in firebase promise, details: ' + details);
			that.props.onChange(details);
		});
	},
	render: function(){

		return (
			<div>
				<h1 className="page-header">User Dashboard</h1>
				<form>
				<EditableText title="Name" placeHolder={this.context.userData? this.context.userData.userName : 'loading...'} keyName="userName" onChange={this.update} />
				<EditableText title="Phone Number" placeHolder={this.context.userData? this.context.userData.phone : 'loading...'} keyName="phone" onChange={this.update} />
				<EditableDropDown title="Default 'From' Language" placeHolder={this.context.userData? this.context.userData.defaultFrom : 'loading'} keyName="defaultFrom" selectionData={langData} onChange={this.update} />
				<EditableDropDown title="Default 'To' Language" placeHolder={this.context.userData? this.context.userData.defaultTo : 'loading'} keyName="defaultTo" selectionData={langData} onChange={this.update} />
				</form>
			</div>
		);
	}
});

module.exports = dashboard;