var React = require('react');
var firebase = require('firebase');
var UserDataForm = require('./dashboard/UserDataForm.js');


var dashboard = React.createClass({
	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired
	},
	componentWillMount: function(){
		//small optimization: check to see if redirected from login as check for login status.
		var justLoggedIn = (this.props.location.state && this.props.location.state.loggedIn);

		if (!this.props.loggedIn && !justLoggedIn) {
			var thisRouter = this.context.router;
			var that = this;
			//check auth again in case of page refresh.
			//TODO: maybe I can do this with onEnter via router? 
			firebase.auth().onAuthStateChanged(firebaseUser => { 
				if (firebaseUser === null){
					//re-route to login page.
					thisRouter.push({
						pathname: '/login',
						state: {fromPage: '/dashboard'}
					});
				} else {
					that.setState({
						currentUser: this.props.currentUser
					})
				}
			});
		} 
	},
	render: function(){
		return (
			<div>
				<h1 className="page-header">User Dashboard</h1>
				<UserDataForm user={this.props.currentUser}/>
			</div>
		);
	}
});

module.exports = dashboard;