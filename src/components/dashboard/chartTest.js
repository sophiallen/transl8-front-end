var React = require('react');

var LineChart = require('react-chartjs').Line;
var BarChart = require('react-chartjs').Bar;

var GraphComponent = React.createClass({
	getInitialState: function(){
		return {
			chartData: {
				labels: ["January", "February", "March", "April", "May","June","July"],
				datasets: [
					{
						data: [1,1.5,3,4,2.5,5,1]
					}
				]
			}
		}
	},
	upJan: function(){
		var dataset = this.state.chartData;
		dataset.datasets[0].data[0] += 1;
		this.setState({chartData: dataset})
	},
	render: function(){
		return <div>
			<BarChart data={this.state.chartData} width="600" height="300"/>
			<button className="btn btn-default" onClick={this.upJan}>Increase Jan</button>
			</div>
	}

});

module.exports = GraphComponent;