var React = require('react');

var Flashcard = React.createClass({
	getInitialState: function(){
		return {flipped: false}
	},
	flip: function(){
		this.setState({flipped: !this.state.flipped});
	},
	render: function(){
		var flipClass = this.state.flipped? 'flip-container flipped' : 'flip-container';

		return (
			<div className={flipClass} onClick={this.flip}>
				<div className="flipper">
						<div className="front">
							<p>Front Content</p>
							<p>Front Content</p>
							<p>Front Content</p>
						</div>
						<div className="back">
							<p>Back Content</p>			
							<p>Back Content</p>			
							<p>Back Content</p>			
						</div>
				</div>
			</div>
		)
	}
});

module.exports = Flashcard;