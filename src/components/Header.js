'use strict';

var React = require('react');

var Header = React.createClass({
	render: function(){
		return (<div className="jumbotron">
				<h1>Transl8 <small>Smart & Simple SMS Translation</small></h1>
			</div>);
	}
});

module.exports = Header;