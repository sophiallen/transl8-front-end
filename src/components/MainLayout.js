var React = require('react');
var Header = require('./Header.js');
var Link = require('react-router').Link;

var HomePage = React.createClass({
	render: function(){
		return (
			<div>
				<Header />
				
				{this.props.children}
			</div>
			);
	}
});

module.exports = HomePage;