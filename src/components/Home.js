var React = require('react');
var Header = require('./Header.js');

module.exports = React.createClass({
	render: function(){
		return (
				<div>
					<h1 className="page-header">Welcome to Transl8r</h1>
					<h4>We're making mobile translation more accessible, one text at a time. Let's get started!</h4>
				</div>
		)
	}
});