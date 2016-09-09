var React = require('react');
var ActivityItem = require('./ActivityItem.js');

var ActivityGrid = React.createClass({
	render: function(){
		return (
				<table className="table table-hover">
					<tbody>
						<tr className="th">
							<td>Select</td>
							<td>Date</td>
							<td>Direction</td>
							<td>Untranslated</td>
							<td>Translation</td>
						</tr>
						<ActivityItem date="7/23/2016" direction="en-fr" text="untranslated" translation="translation"/>
						<ActivityItem date="7/27/2016" direction="en-fr" text="untranslated" translation="translation"/>
					</tbody>
				</table>
			);
	}
});

module.exports = ActivityGrid;
