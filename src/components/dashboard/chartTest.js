var React = require('react');

var LineChart = require('react-chartjs').Line;
var BarChart = require('react-chartjs').Bar;
var PieChart = require('react-chartjs').Pie;

var GraphComponent = React.createClass({
	getInitialState: function(){
		return {
			chartData: [
				{
				    value: 300,
				    color:"#F7464A",
				    highlight: "#FF5A5E",
				    label: "Red"
				},
				{
				    value: 50,
				    color: "#46BFBD",
				    highlight: "#5AD3D1",
				    label: "Green"
				},
				{
				    value: 100,
				    color: "#FDB45C",
				    highlight: "#FFC870",
				    label: "Yellow"
				}
				]
		}
	},
	render: function(){
		return <div>
			<PieChart data={this.state.chartData} width="300" height="300"/>
			<button className="btn btn-default">Increase Jan</button>
			</div>
	}

});

module.exports = GraphComponent;