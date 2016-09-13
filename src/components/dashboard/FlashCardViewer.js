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
)
	},
	render: function(){
		return (<div>
				<form className="form-inline">
					<div className="form-group">
						<label>Select Flash Card Deck:   </label>
						<select ref="newSelection" className="form-control" defaultValue="none selected">
							<option value="none">None </option>
							{this.props.selectionData.map(this.createDeckItem)}
						</select>
						<button type="submit" className="btn btn-small btn-success pull-right" onClick={this.save}>Save</button>
						<button className="btn btn-small btn-warning pull-right" onClick={this.cancel}>Cancel</button>
					</div>
				</form>

			</div>)
	}
})