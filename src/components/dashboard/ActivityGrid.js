var React = require('react');
var ActivityItem = require('./ActivityItem.js');
var firebase = require('firebase');
var ReactFireMixin = require('reactfire');

var ActivityGrid = React.createClass({
	getInitialState: function(){
		return {messages: [],
			selected: []}
	},
	componentWillMount: function(){
		var that = this;

		//will fire once per child in ref, then again for each child added. 
		firebase.database().ref('/user-messages/' + this.props.user.uid).on('child_added', function(data) {
			var messages = that.state.messages;
			messages.push(data.val());
			that.setState({messages: messages});
		});

	},
	eachItem: function(item, index){
		return(
			<ActivityItem update={this.handleSelect} itemIndex={index} key={index} date={item.date} direction={item.direction} text={item.untranslated} translation={item.translated}/>
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
	handleSelect: function(checked, index){ //saves indices of selected items to array.
		var selected = this.state.selected;
		if (checked){
			selected.push(index);
		} else {
			var toRemove = selected.indexOf(index);
			selected.splice(toRemove,1);
		}
		this.setState({selected: selected});
	},
	createDeck: function(e){
		e.preventDefault();
		this.setState({showForm: false});

		var messages = this.state.messages;
		var cards = this.state.selected.map(function(indexNum){
				return messages[indexNum];
		});			

		var newDeck = {
			name: this.refs.newText.value,
			cards: cards
		}
		var userId = this.props.user.uid;
		var newSetKey = firebase.database().ref().child('user-cards/' + userId).push().key;
		
		firebase.database().ref('user-cardsets/' + userId+ '/' + newSetKey).set(newDeck)
		.then(function(){
			console.log('successfully saved flashcard set to db');
		}).catch(function(){
			console.log('error occurred in saving set');
		});
		console.log(newDeck);
	},
	showForm: function(){
		this.setState({showForm: true});
	},
	cancel: function(){
		this.setState({showForm: false});
	},
	renderForm: function(){
		return (
			<form className="form-inline">
				<div className="form-group"><label><strong>Name of Flashcard Deck: </strong></label>
					<input type="text" ref="newText" className="form-control"/>
					<button onClick={this.createDeck} type="submit" className="btn btn-success btn-small">Save</button>
					<button onClick={this.cancel} className="btn btn-warning btn-small">Cancel</button>
				</div>
			</form>)
	},
	render: function(){
		var messages = (<tr><td>'loading...'</td></tr>);
		if (this.state.messages){
			messages = this.state.messages.map(this.eachItem);
		}
		var form = this.state.showForm? this.renderForm() : '';

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
					<button onClick={this.showForm}
					 disabled={this.state.selected.length > 0? '' : 'disabled'} 
					 className="btn btn-danger">Create Deck from Selected</button>
					{form}
		</div>)
	}
});

module.exports = ActivityGrid;
