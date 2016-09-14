var React = require('react');
var firebase = require('firebase');
var EditableText = require('./dashboard/EditableText.js');
var EditableDropDown = require('./dashboard/EditableSelect.js');
var ActivityGrid = require('./dashboard/ActivityGrid.js');
var Flashcard = require('./dashboard/Flashcard.js');
var FlashcardDeck = require('./dashboard/FlashcardDeck.js');
var FlashCardViewer = require('./dashboard/FlashCardViewer.js');
var langData = require('./../data/languages.js');

var dashboard = React.createClass({
	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired,
		userData: React.PropTypes.object,
		userMessages: React.PropTypes.object
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
	addSampleData: function(){
		var today = new Date();
		var message = {
			date: today.toDateString(),
			untranslated: 'hello world',
			direction: 'en-es',
			translated: 'hola mundo'
		}

		var newPostKey = firebase.database().ref().child('user-messages/' + this.props.currentUser.uid).push().key;
		console.log(newPostKey);

		var updates = {};
		updates['user-messages/' + this.props.currentUser.uid + '/' + newPostKey] = message;
		firebase.database().ref().update(updates);
	},
	render: function(){
		var activityView;
		var cardDeck;
		var cardViewer;
		if (this.props.currentUser){
			activityView = <ActivityGrid user={this.props.currentUser}/>
			cardDeck = <FlashcardDeck user={this.props.currentUser} />
			cardViewer = <FlashCardViewer user={this.props.currentUser} />
		} else {
			activityView = <p>Loading data...</p>
			cardDeck = <p>Loading data...</p>
			cardViewer = <p>Loading data...</p>
		}
		return (
			<div className="dashboard">
				<h1 className="page-header">User Dashboard</h1>

				<div className="settings">
					<h3>Account Settings</h3>
					<EditableText title="Name" placeHolder={this.context.userData? this.context.userData.userName : 'loading...'} keyName="userName" onChange={this.update} />
					<EditableText title="Phone Number" placeHolder={this.context.userData? this.context.userData.phone : 'loading...'} keyName="phone" onChange={this.update} />
					<EditableDropDown title="Default 'From' Language" placeHolder={this.context.userData? this.context.userData.defaultFrom : 'loading'} keyName="defaultFrom" selectionData={langData} onChange={this.update} />
					<EditableDropDown title="Default 'To' Language" placeHolder={this.context.userData? this.context.userData.defaultTo : 'loading'} keyName="defaultTo" selectionData={langData} onChange={this.update} />
				</div>

				<div className="activity-feed">
					<h3>Recent Translations</h3>
					{activityView}	
					<button className="btn btn-danger" onClick={this.addSampleData}>Add Sample Data</button>
				</div>
				<div className="flashCards">
					{cardDeck}
				</div>
				{cardViewer}
			</div>
		);
	}
});

module.exports = dashboard;