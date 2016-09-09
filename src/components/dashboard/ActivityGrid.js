var React = require('react');
var ActivityItem = require('./ActivityItem.js');
var firebase = require('firebase');
var ReactFireMixin = require('reactfire');

var ActivityGrid = React.createClass({
	getInitialState: function(){
		return {messages: []}
	},
	componentWillMount: function(){
		var that = this;
		// firebase.database().ref('/user-messages/' + this.props.user.uid).once('value')
		// .then(function(snapshot) { //get intial details
		// 	var userMessages = snapshot.val();
		// 	console.log('retrieved messages: ' + userMessages);
		// 	var messageList = [];
		// 	for (var message in userMessages){
		// 		messageList.push(userMessages[message]);
		// 	}
		// 	that.setState({messages: messageList});
		// });

		//will fire once per child in ref, then again for each child added. 
		firebase.database().ref('/user-messages/' + this.props.user.uid).on('child_added', function(data) {
			console.log('heard added: ' + data.val().untranslated);
			var messages = that.state.messages;
			messages.push(data.val());
			that.setState({messages: messages});
		});

	},
	eachItem: function(item, index){
		return(
			<ActivityItem key={index} date={item.date} direction={item.direction} text={item.untranslated} translation={item.translated}/>
			)
	},
	render: function(){
		var messages = <tr><td>'loading...'</td></tr>
		if (this.state.messages){
			messages = this.state.messages.map(this.eachItem);
		}

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
						{messages}
					</tbody>
				</table>
			);
	}
});

module.exports = ActivityGrid;
