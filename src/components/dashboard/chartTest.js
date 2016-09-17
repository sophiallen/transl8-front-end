var React = require('react');
var Firebase = require('firebase');

var LineChart = require('react-chartjs').Line;
var BarChart = require('react-chartjs').Bar;
var PieChart = require('react-chartjs').Pie;

var langColors = {
	English: {
		color:"#F7464A",
		highlight: "#FF5A5E"
	},
	Spanish: {
		color: "#FDB45C",
	    highlight: "#FFC870"
	},
	French: {
		color: "#46BFBD",
	    highlight: "#5AD3D1"
	}
}

var GraphComponent = React.createClass({
	getInitialState: function(){
		return {
			chartData: []
		}
	},
	componentWillMount: function(){
		var that = this;
		var chartData = this.state.chartData;
		firebase.database().ref('/user-langdata/' + this.props.user.uid).on('child_added', function(data) {
			var formatted = that.formatLangData(data.val());
			chartData.push(formatted);
			that.setState({chartData: chartData});
		});
	},
	addSampleData: function(){
		var langObj = [
			{langName: 'English', numTexts: 25},
			{langName: 'Spanish', numTexts: 32},
			{langName: 'French', numTexts: 15}
		]

		var updates = {};
		updates['user-langdata/' + this.props.user.uid] = langObj;
		firebase.database().ref().update(updates);
	},
	formatLangData: function(langObj){
		var newData = {
			value: langObj.numTexts,
			color: langColors[langObj.langName].color,
			highlight: langColors[langObj.langName].highlight,
			label: langObj.langName
		}
		return newData;
	},
	render: function(){
		return (<div>
					<PieChart data={this.state.chartData} width="200" height="200"/>
				</div>)
	}
});

module.exports = GraphComponent;