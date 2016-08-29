'use strict';

var React = require('react');
var Navbar = require('./NavBar.js');

var Header = React.createClass({
	render: function(){
		return (
			<div>
				<div className="jumbotron">
					<h1>Transl8r</h1>
				</div>
				<Navbar/>
			</div>
			);
	}
});

module.exports = Header;