var React = require('react');
var ActivityItem = require('./ActivityItem.js');
var Link = require('react-router').Link;
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
		var newSetKey = firebase.database().ref().child('user-cardsets/' + userId).push().key;
		
		var that = this;
		firebase.database().ref('user-cardsets/' + userId+ '/' + newSetKey).set(newDeck)
		.then(function(){
			console.log('successfully saved flashcard set to db');
			that.setState({showFeedback: true, dbResponse: 1});
		}).catch(function(){
			console.log('error occurred in saving set');
			that.setState({showFeedback: true, dbResponse: -1});
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
	displayFeedback: function(){
		if (this.state.dbResponse === 1){
			return (<div className="alert alert-success">
						<p>Success!<Link to="/flashcards">Go to Flashcards</Link> to use your deck.
						<button onClick={this.hideFeedback} className="btn btn-sm pull-right">X</button>
					</p></div>);
		} else {
			return (<div className="alrt alert-danger">
				<p>Error: unable to save flashcards. Please try again later.
				<button onClick={this.hideFeedback} className="btn btn-sm pull-right">X</button>
				</p></div>);
		}
	},
	hideFeedback: function(){
		this.setState({showFeedback: false});
	},
	render: function(){
		var messages = (<tr><td>'loading...'</td></tr>);
		if (this.state.messages){
			messages = this.state.messages.map(this.eachItem);
		}
		var form = this.state.showForm? this.renderForm() : '';
		var feedback = this.state.showFeedback? this.displayFeedback() : '';
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
					<button onClick={this.showForm} disabled={this.state.selected.length > 0? '' : 'disabled'} className="btn btn-danger">Create Deck from Selected</button>
					{form}
					{feedback}
				</div>)
	}
});

module.exports = ActivityGrid;
