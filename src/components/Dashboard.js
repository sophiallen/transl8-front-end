var React = require('react');
var firebase = require('firebase');
var UserSettingsView = require('./dashboard/UserSettings.js');
var ActivityGrid = require('./dashboard/ActivityGrid.js');

// var FlashCardViewer = require('./dashboard/FlashCardViewer.js');
var langData = require('./../../data/languages.js');
var Chart = require('./dashboard/chartTest.js');

var dashboard = React.createClass({
	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired,
		userData: React.PropTypes.object,
		userMessages: React.PropTypes.object
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
		var sampleLangData = [
			{langName: 'English', numTexts: 30},
			{langName: 'French', numTexts: 15},
			{langName: 'Spanish', numTexts: 50}
		];

		var chart;
		if (this.props.currentUser){
			activityView = <ActivityGrid user={this.props.currentUser}/>
			chart = <Chart user={this.props.currentUser} />
		} else {
			activityView = <p>Loading data...</p>
			chart = <p></p>
		}
		return (
			<div className="dashboard">
				<h1 className="page-header">User Dashboard</h1>
				<div className="row">

					<div className="settings col-md-7">
						<UserSettingsView userData={this.context.userData} langData={langData}/>
					</div>

					<div className="col-md-5 userPieChart">
						<h3>Your Language Use</h3>
						{chart}
					</div>
				</div>

				<div className="activity-feed">
					<h3>Recent Translations</h3>
					{activityView}	
				</div>
				<button className="btn btn-default" onClick={this.addSampleData}>Add Sample Data</button>
			</div>
		);
	}
});

module.exports = dashboard;