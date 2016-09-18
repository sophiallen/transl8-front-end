var React = require('react');
var Flashcard = require('./Flashcard.js');

var FlashcardDeck = React.createClass({
	getInitialState: function(){
		return {
			currentCard: 0
		}
	},
	eachCard: function(item, index){
		var cardClass = (index === this.state.currentCard)? "current-card" : 'background-card';
		return (<Flashcard key={index} front={item.translated} back={item.untranslated}  className={cardClass}/>);
	},
	nextCard: function(){
		var nextCardIndex = (this.state.currentCard + 1)%this.props.cards.length;
		this.setState({currentCard: nextCardIndex});
	},
	prevCard: function(){
		var prevCardIndex = this.state.currentCard -1;
		if (prevCardIndex == -1) prevCardIndex = this.props.cards.length-1;
		this.setState({currentCard: prevCardIndex});
	},
	render: function(){
		var cards =	this.props.cards.map(this.eachCard);
		return (
			<div className="wrap-deck">
				<h3>{this.props.title}</h3>
				<i onClick={this.prevCard} className="fa fa-arrow-circle-left fa-4x" aria-hidden="true"></i>
				<div className="card-deck">
						{cards[this.state.currentCard]}
				</div>
				<i onClick={this.nextCard} className="fa fa-arrow-circle-right fa-4x" aria-hidden="true"></i>
			</div>)
	}
});

module.exports = FlashcardDeck;