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
							<h4>{this.props.front}</h4>
						</div>
						<div className="back">
							<h4>{this.props.back}</h4>		
						</div>
				</div>
			</div>
		)
	}
});

module.exports = Flashcard;