var React = require('react');
var firebase = require('firebase');
var config = require('./../../firebase.config.js');

//initialize firebase
firebase.initializeApp(config);

function requireAuth(nextState, replace){
	// var user = firebase.auth().currentUser;
	// console.log('In requireAuth, current user: ' + user);
	// if (null === firebase.auth().currentUser){
	// 	replace({
	// 		pathname: '/login',
	// 		state: {nextPathName: nextState.location.pathname}
	// 	});
	// } else {
	// 	console.log('current user: ' + user.email);
	// }
	
}	

module.exports = requireAuth;