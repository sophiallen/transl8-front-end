var React = require('react');
var NavBar = require('./NavBar.js');
var Link = require('react-router').Link;
var firebase = require('firebase');

var HomePage = React.createClass({
	getInitialState: function(){
		var user = firebase.auth().currentUser;
		console.log('in app getInitialState, user: ' + user);
		return {
			loggedIn: (null !== user),
			currentUser: user,
			userDetails: null
		}
	},
	componentWillMount: function(){
		var that = this;
		firebase.auth().onAuthStateChanged(firebaseUser => {
			that.setState({
				loggedIn: (null !== firebaseUser)
			});

			if (firebaseUser){
				var userDetails = this.getUserDetails(firebaseUser.uid);
				that.getUserMessages(firebaseUser.uid);
				that.setState({currentUser: firebaseUser, userDetails: userDetails});
			} else {
				console.log('No one logged in');
				that.setState({currentUser: 'no one logged in', userDetails: null});
			}
		});
	},
	getUserDetails: function(userId){
		var that = this;
		var userRef = firebase.database().ref('/users/' + userId);
		userRef.once('value').then(function(snapshot) { //get intial details
			var userDetails = snapshot.val();
			that.setState({userDetails: userDetails});
			return userDetails;
		});
	},
	getUserMessages: function(userId){
		var that = this;
		firebase.database().ref('/users/' + userId).once('value')
		.then(function(snapshot) { //get intial details
			var userMessages = snapshot.val();
			console.log('retrieved messages: ' + userMessages);
			that.setState({userMessages: userMessages});
		});
	},
	updateUserDetail: function(newDetails){
		this.setState({userDetails: newDetails});
	},
	childContextTypes: {
		userData: React.PropTypes.object,
		userMessages: React.PropTypes.object
	},
	getChildContext: function(){
		return {
			userData: this.state.userDetails, 
			userMessages: this.state.userMessages
		}
	},
	render: function(){
		return (
			<div>
				<NavBar loggedIn={this.state.loggedIn}/>
				<div className="pageContent">
					{React.cloneElement(this.props.children, {loggedIn: this.state.loggedIn, currentUser: this.state.currentUser, onChange: this.updateUserDetail})}
				</div>
				<button onClick={this.handleSubmit}>Add sample data</button>
			</div>
			);
	},
	handleSubmit: function(e){ //adding sample data to db
		var today = new Date();
		var message1 = {
			date: today.toDateString(),
			untranslated: 'hello world',
			dir: 'en-es',
			translated: 'hola mundo'
		}
		var message2 = {
			date: today.toDateString(),
			untranslated: 'hello world',
			direction: 'en-fr',
			translated: 'bonjour le monde'
		}

		var newPostKey = firebase.database().ref().child('user-messages/' + this.state.currentUser.uid).push().key;
		console.log(newPostKey);

		var updates = {};
		updates['user-messages/' + this.state.currentUser.uid + '/' + newPostKey] = message2;
		firebase.database().ref().update(updates);

		// firebase.database().ref('user-messages/' + this.state.currentUser.uid).set({
		// 	1: message1,
		// 	2: message2
		// }) .then(function(result){
		// 	console.log('successfully saved data');
		// }).catch(function(error){
		// 	console.log('error: ' + error.message);
		// });

	}
});

module.exports = HomePage;