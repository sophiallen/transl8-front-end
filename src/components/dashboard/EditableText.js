var React = require('react');


var EditableText = React.createClass({
	//recieves props: placeHolder, keyName
	getInitialState: function(){
		return {
			editing: false
		}
	},
	renderForm: function(){
		return (
			<div>
				<input type="text" ref="newText" placeholder={this.props.placeHolder} className="form-control"/>
				<button onClick={this.save} className="btn btn-success">Save</button>
			</div>)
	},
	renderDisplay: function(){
		return (<span>
					{this.props.placeHolder} 
					<button className="btn btn-small btn-default" onClick={this.edit}>Edit</button>
				</span>);
	},
	save: function(){
		this.setState({editing: false});
		this.props.onChange(this.refs.newText.value, this.props.keyName);
	},
	edit: function(){
		this.setState({editing: true});
	},
	render: function(){
		if (this.state.editing){
			return this.renderForm();
		} else {
			return this.renderDisplay();
		}
	}
});

module.exports = EditableText;