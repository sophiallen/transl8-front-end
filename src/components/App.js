var React = require('react');
var NavBar = require('./NavBar.js');
var Link = require('react-router').Link;

var HomePage = React.createClass({
	render: function(){
		return (
			<div>
				<NavBar />
				<div className="pageContent">
					{this.props.children}
				</div>
			</div>
			);
	}
});

module.exports = HomePage;