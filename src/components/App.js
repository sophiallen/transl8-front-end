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
				that.getUserDetails(firebaseUser.uid);
				that.getUserMessages(firebaseUser.uid);
				that.setState({currentUser: firebaseUser});
			} else {
				console.log('No one logged in');
				that.setState({currentUser: null, userDetails: null});
			}
		});
	},
	getUserDetails: function(userId){
		var that = this;
		var userRef = firebase.database().ref('/users/' + userId);
		userRef.once('value').then(function(snapshot) { //get intial details
			var userDetails = snapshot.val();
			that.setState({userDetails: userDetails});
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
			</div>
			);
	}
});

module.exports = HomePage;