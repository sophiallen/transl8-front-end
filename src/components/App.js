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
			userDetails: {}
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
		});
		userRef.on('child_changed', function(data){ //listen for changes in user details
			console.log('heard change in data');
			that.setState({userDetails: data.val()});
		});
	},
	updateUserDetail: function(newDetails){
		this.setState({userDetails: newDetails});
	},
	render: function(){
		return (
			<div>
				<NavBar loggedIn={this.state.loggedIn}/>
				<div className="pageContent">
					{React.cloneElement(this.props.children, {loggedIn: this.state.loggedIn, currentUser: this.state.currentUser, userDetails: this.state.userDetails, onChange: this.updateUserDetail})}
				</div>
			</div>
			);
	}
});

module.exports = HomePage;