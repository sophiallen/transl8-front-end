'use strict';

var React = require('react');
var Navbar = require('./NavBar.js');
var Link = require('react-router').Link;

var Header = React.createClass({
	render: function(){
		return (
			<div>
				<div className="jumbotron">
					<Link to="/"><h1>Transl8r</h1></Link>
				</div>
				<Navbar/>
			</div>
			);
	}
});

module.exports = Header;