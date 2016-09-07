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
				that.setState({currentUser: firebaseUser, userDetails: userDetails});
			} else {
				console.log('No one logged in');
				that.setState({currentUser: 'no one logged in'});
			}
		});
	},
	getUserDetails: function(userId){
		var that = this;
		firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
			var userDetails = snapshot.val();
			that.setState({userDetails: userDetails});
		});
	},
	render: function(){
		return (
			<div>
				<NavBar loggedIn={this.state.loggedIn}/>
				<div className="pageContent">
					{React.cloneElement(this.props.children, {loggedIn: this.state.loggedIn, currentUser: this.state.currentUser, userDetails: this.state.userDetails})}
				</div>
			</div>
			);
	}
});

module.exports = HomePage;