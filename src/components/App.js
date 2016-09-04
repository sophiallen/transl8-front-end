var React = require('react');
var NavBar = require('./NavBar.js');
var Link = require('react-router').Link;
var firebase = require('firebase');

var HomePage = React.createClass({
	getInitialState: function(){
		var user = firebase.auth().currentUser;
		return {
			loggedIn: (null !== user),
			currentUser: user
		}
	},
	componentWillMount: function(){
		var that = this;
		firebase.auth().onAuthStateChanged(firebaseUser => {
			that.setState({
				loggedIn: (null !== firebaseUser)
			});

			if (firebaseUser){
				console.log('Logged IN: ' + firebaseUser.email);
				that.setState({currentUser: firebaseUser});
			} else {
				console.log('No one logged in');
				that.setState({currentUser: 'no one logged in'});
			}
		});
	},
	render: function(){
		return (
			<div>
				<NavBar loggedIn={this.state.loggedIn}/>
				<div className="pageContent">
					{React.cloneElement(this.props.children, {loggedIn: this.state.loggedIn, currentUser: this.state.currentUser})}
				</div>
			</div>
			);
	}
});

module.exports = HomePage;