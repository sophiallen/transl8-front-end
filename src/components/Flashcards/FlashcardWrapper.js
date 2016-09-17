var React = require('react');
var FlashCardSelectView = require('./FlashCardSelectView.js');

module.exports = React.createClass({
	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired,
		currentUser: React.PropTypes.object,
	},
	componentWillMount: function(){
		//small optimization: check to see if redirected from login as check for login status.
		var justLoggedIn = (this.props.location.state && this.props.location.state.loggedIn);
		
		if (!this.props.loggedIn && !justLoggedIn) {
			var thisRouter = this.context.router;
			var that = this;

			firebase.auth().onAuthStateChanged(firebaseUser => { 
				if (firebaseUser === null){
					//no one logged in, re-route to login page.
					thisRouter.push({
						pathname: '/login',
						state: {fromPage: '/flashcards'}
					});
				} 
			});
		} 
	},
	render: function(){
		if (this.props.currentUser){
			return <FlashCardSelectView user={this.props.currentUser}/>
		} else if (this.context.currentUser){
			return <FlashCardSelectView user={this.context.currentUser} />
		} else {
			return <div>Loading...</div>
		}
	}
});