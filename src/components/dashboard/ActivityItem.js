var React = require('react');

var ActivityItem = React.createClass({
	render: function(){
		return (
			<tr>
				<td>
					<input type="checkbox" ref="checkbox"/>
				</td>
				<td>{this.props.date}</td>
				<td>{this.props.direction}</td>
				<td>{this.props.text}</td>
				<td>{this.props.translation}</td>
			</tr>
		);
	}
});

module.exports = ActivityItem;