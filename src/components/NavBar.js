'use strict';

var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	render: function(){
		return (
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="navbar-header">
					<Link to="/" className="navbar-brand">Transl8r</Link>
				</div>
				<div className="container-fluid">
					<ul className="nav navbar-nav">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/login">Login</Link></li>
					</ul>
				</div>
			</nav>);
	}
});

