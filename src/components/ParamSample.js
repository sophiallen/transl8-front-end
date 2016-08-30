var React = require('react');


module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<h2>{this.props.params.testparam}</h2>
			</div>
		)
	}
})