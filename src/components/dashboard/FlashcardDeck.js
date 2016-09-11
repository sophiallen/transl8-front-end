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
	prevCard: function(){
		var prevCardIndex = this.state.currentCard -1;
		if (prevCardIndex == -1) prevCardIndex = this.state.cards.length-1;
		this.setState({currentCard: prevCardIndex});
		console.log(prevCardIndex);
	},
	render: function(){
		var cards =	this.state.cards.map(this.eachCard);

		return (
			<div className="card-deck">
				{cards[this.state.currentCard]}
				<div className="deckNavBtns">
					<button onClick={this.nextCard} className="btn btn-success">Next Card</button>
					<button onClick={this.prevCard} className="btn btn-danger">Previous Card</button>
				</div>
			</div>)
	}
});

module.exports = FlashcardDeck;