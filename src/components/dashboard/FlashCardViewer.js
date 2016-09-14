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
	componentWillMount: function(){ 
		var that = this;
		var decks = this.state.decks;
		firebase.database().ref('/user-cardsets/' + this.props.user.uid).on('child_added', function(data) {
			decks.push(data.val());
			that.setState({decks: decks});
		});
	},
	createDeckItem: function(item, index){
		return <option key={index} value={item.name}>{item.name}</option>
	},
	selectDeck: function(){
		var selection = this.refs.selectDeckDropDown.value;
		var newDeck = this.state.decks.find(function(item){
			return item.name === selection;
		});
		this.setState({currentDeck: newDeck});
	},
	render: function(){

		var currentDeck = this.state.currentDeck? <FlashcardDeck title={this.state.currentDeck.name} cards={this.state.currentDeck.cards} /> : <p>Select a deck above to view cards</p>;
		
		return (<div>
				<form className="form-inline">
					<div className="form-group">
						<label>Select Flash Card Deck:   </label>
						<select onChange={this.selectDeck} ref="selectDeckDropDown" className="form-control" defaultValue="none selected">
							<option value="none">None </option>
							{this.state.decks.map(this.createDeckItem)}
						</select>
					</div>
				</form>
				{currentDeck}
			</div>)
	}
});

module.exports = FlashCardViewer;