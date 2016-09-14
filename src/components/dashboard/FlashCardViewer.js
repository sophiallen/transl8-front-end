var React = require('react');
var FlashcardDeck = require('./FlashcardDeck.js');

var FlashCardViewer = React.createClass({
	propTypes: {
		user: React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		return {
			decks: []
		}
	},
	componentWillMount: function(){ //get db 
		var that = this;
		var decks = this.state.decks;
		firebase.database().ref('/user-decks/' + this.props.user.uid).on('child_added', function(data) {
			decks.push(data.val());
			that.setState({cards: cards});
		});
	},
	createDeckItem: function(item, index){
		return<option key={index} value={item.langCode}>{item.langName}</option>
	},
	createSampleDeck: function(){
		var uid = this.props.user.uid;
		var messages = [{
					untranslated: 'hello world',
					direction: 'en-es',
					translated: 'hola mundo'
				},
				{
					untranslated: 'hello again',
					direction: 'en-es',
					translated: 'hola mundo'
				},
				{
					untranslated: 'third hello',
					direction: 'en-es',
					translated: 'hola mundo'
				},
				{
					untranslated: 'fourth hellp',
					direction: 'en-es',
					translated: 'hola mundo'
				}];
		var newDeck = {
			name: 'Sample Deck',
			cards: messages
		};
		var newPostKey = firebase.database().ref().child('user-cards/' + uid).push().key;
		var updates = {};
		updates['user-cards/' + uid + '/' + newPostKey] = newDeck;
		firebase.database().ref().update(updates);
	},
	render: function(){
		// {this.props.selectionData.map(this.createDeckItem)}

		return (<div>
				<form className="form-inline">
					<div className="form-group">
						<label>Select Flash Card Deck:   </label>
						<select ref="newSelection" className="form-control" defaultValue="none selected">
							<option value="none">None </option>
						</select>
						<button type="submit" className="btn btn-small btn-success" onClick={this.save}>Save</button>
					</div>
				</form>
				<button onClick={this.createSampleDeck} className="btn btn-default">Create sample deck </button>
			</div>)
	}
});

module.exports = FlashCardViewer;