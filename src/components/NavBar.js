'use strict';

var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	render: function(){
		var LoginBtn;
		var regBtn;
		if (this.props.loggedIn){
			LoginBtn = <li><Link to="/logout"><button className="btn btn-primary">Log Out</button></Link></li>;
			regBtn = null;
		} else {
			LoginBtn = <li><Link to="/login"><button className="btn btn-primary">Log In</button></Link></li>;
			regBtn = <li><Link to="/register"><button className="btn btn-primary">Register</button></Link></li>;

		}
		return (
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="navbar-header">
					<Link to="/" className="navbar-brand">Transl8r</Link>
				</div>
				<div className="container-fluid">
					<ul className="nav navbar-nav">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/dashboard">Dashboard</Link></li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						{regBtn}
						{LoginBtn}
					</ul>
				</div>
			</nav>);
	}
});

