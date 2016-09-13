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
	createCardSet: function(){
		var newSetKey = firebase.database().ref().child('user-cards/' + this.props.currentUser.uid).push().key;

		firebase.database().ref('user-cards/' + this.props.currentUser.uid + '/' + newSetKey).set({
			setName: 'Test Set',
			cards: this.context.userMessages
		}).then(function(){
			console.log('successfully saved set');
		}).catch(function(){
			console.log('error occurred in saving set');
		});
	},
	createCardSet: function(){
		
	},
	render: function(){
		var messages = <tr><td>'loading...'</td></tr>
		if (this.state.messages){
			messages = this.state.messages.map(this.eachItem);
		}

		return (<div>
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
				<button onClick={this.createCardSet} className="btn btn-success">Create FlashCards</button>
				<div>
			);
	}
});

module.exports = ActivityGrid;
