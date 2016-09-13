var React = require('react');
var Flashcard = require('./Flashcard.js');

var FlashcardDeck = React.createClass({
	getInitialState: function(){
		var cards = [];

		//convert incoming json into array of cards
		for (var item in this.props.cards){
			cards.push(this.props.cards[item]);
		}

		return {
			cards: cards,
			title: this.props.title,
			currentCard: 0
		}
	},
	componentWillMount: function(){

	},
	eachCard: function(item, index){
		var cardClass = (index === this.state.currentCard)? "current-card" : 'background-card';
		return (<Flashcard key={index} front={item.translated} back={item.untranslated}  className={cardClass}/>);
	},
	nextCard: function(){
		var nextCardIndex = (this.state.currentCard + 1)%this.state.cards.length;
		this.setState({currentCard: nextCardIndex});
	},
	prevCard: function(){
		var prevCardIndex = this.state.currentCard -1;
		if (prevCardIndex == -1) prevCardIndex = this.state.cards.length-1;
		this.setState({currentCard: prevCardIndex});
		console.log(prevCardIndex);
	},
	render: function(){
		var cards =	this.state.cards.map(this.eachCard);
		//todo: dropdown to select card set
		return (
			<div className="card-deck">
				{cards[this.state.currentCard]}
				<div className="deckNavBtns">
					<button onClick={this.prevCard} className="btn btn-danger">Previous Card</button>
					<button onClick={this.nextCard} className="btn btn-success">Next Card</button>
				</div>
			</div>)
	}
});

module.exports = FlashcardDeck;