var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<h1 className="page-header">About The App</h1>
				<h4>About Page Here!</h4>
				<p><Link to="about/test_message">Try a param</Link></p>
			</div>
		);
	}
});