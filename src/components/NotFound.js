var React = require('react');

var Link = require('react-router').Link;

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<h1 className="page-header">Page Unavailable</h1>
				<h3>Sorry, looks like this page does not exist yet. Click <Link to="/">here</Link> to return to the home page.</h3>
			</div>
		);
	}
})