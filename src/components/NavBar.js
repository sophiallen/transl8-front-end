'use strict';

var React = require('react');

module.exports = React.createClass({
	render: function(){
		return (
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<ul className="nav navbar-nav">
						<li><a href="/#home">Home</a></li>
						<li><a href="/#about">About</a></li>
						<li><a href="/#register">Register</a></li>
					</ul>
				</div>
			</nav>);
	}
});

