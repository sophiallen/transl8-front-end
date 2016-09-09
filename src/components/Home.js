var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	render: function(){
		console.log('in home render, userData: ' + this.context.userData);
		return (
				<div>
					<h1 className="page-header">Welcome to Transl8r <small>Powered by Yandex</small></h1>
					<h4>We're making mobile translation more accessible, one text at a time. <Link to="/register">Let's get started!</Link></h4>
					<div className="row">
						<div className="col-md-4">
							<h4>Try out a demo!</h4>
							<span>Pretty picture will go here</span>
						</div>
						<div className="col-md-4">
							<h4>Our Goal</h4>
							<h5>We want to make translation easier and more accessible for people on the go, regardless of their ability to own a smartphone. Our app makes use of text-messaging to allow people to get quick translations without needing an electronic interpreter.</h5>
						</div>
						<div className="col-md-4">
							<h4>Our Approach</h4>
							<h5>We use the power and simplicity of text messaging to allow you to access powerful translation engines such as Google Translate and Yandex. You can either specify language preferences within your text, or set up a user account <Link to="/login">here</Link> to create specialized preferences.</h5>
						</div>
					</div>
				</div>
		)
	}
});