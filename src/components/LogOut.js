var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;

module.exports = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		return {
			error: false
		}
	},
	componentDidMount: function(){
		firebase.auth().signOut();
		this.setState({loggedIn: false});
	},
	render: function(){
		return (
			<div>
				<h1 className="page-header">Logged Out successfully</h1>
			</div>
		);
	} 
});

