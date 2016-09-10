var React = require('react');
var Flashcard = require('./Flashcard.js');

var FlashcardDeck = React.createClass({
	getInitialState: function(){
		return {
			cards: [],
			currentCard: 0
		}
	},
	componentWillMount: function(){
		var that = this;
		firebase.database().ref('/user-messages/' + this.props.user.uid).on('child_added', function(data) {
			var cards = that.state.cards;
			cards.push(data.val());
			that.setState({cards: cards});
		});
	},
	eachCard: function(item, index){
		var cardClass = (index === this.state.currentCard)? "current-card" : 'background-card';
		return (<Flashcard key={index} front={item.translated} back={item.untranslated}  className={cardClass}/>);
	},
	nextCard: function(){
		var nextCardIndex = (this.state.currentCard + 1)%this.state.cards.length;
		this.setState({currentCard: nextCardIndex});
	},
	render: function(){
		var cards =	this.state.cards.map(this.eachCard);

		return (
			<div className="card-deck">
				{cards[this.state.currentCard]}
				<button onClick={this.nextCard} className="btn btn-success">Next Card</button>
			</div>)
	}
});

module.exports = FlashcardDeck;