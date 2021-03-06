var React = require('react');

var ActivityItem = React.createClass({
	getInitialState: function(){
		return {isChecked: false}
	},
	handleCheck: function(e){
		this.props.update(e.target.checked, this.props.itemIndex);
	},	
	render: function(){
		return (
			<tr>
				<td>
					<input onClick={this.handleCheck} type="checkbox" ref="checkbox"/>
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