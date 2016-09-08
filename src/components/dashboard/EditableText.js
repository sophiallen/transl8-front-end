var React = require('react');


var EditableText = React.createClass({
	//recieves props: placeHolder, keyName
	getInitialState: function(){
		return {
			editing: false
		}
	},
	renderForm: function(){
		//to fix: make save button inline
		return (
			<div className="form-group">
				<label><strong>{this.props.title}: </strong></label>
				<input type="text" ref="newText" placeholder={this.props.placeHolder} className="form-control"/>
				<button onClick={this.save} type="submit" className="btn btn-success btn-small">Save</button>
			</div>)
	},
	renderDisplay: function(){
		return (<h4><strong>{this.props.title}: </strong>{this.props.placeHolder} 
					<button type="submit" className="btn btn-small btn-default" onClick={this.edit}>Edit</button>
				</h4>);
	},
	save: function(e){
		e.preventDefault();
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