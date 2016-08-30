var React = require('react');
var firebase = require('firebase');
var config = require('./../../firebase.config.js');

//initialize firebase
firebase.initializeApp(config);

function requireAuth(nextState, replace){
	if (null === firebase.auth().currentUser){
		replace({
			pathname: '/login',
			state: {nextPathName: nextState.location.pathname}
		});
	}
}

module.exports = requireAuth;