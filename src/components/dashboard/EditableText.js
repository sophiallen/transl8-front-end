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
			<form className="form-inline">
				<div className="form-group">
					<label><strong>{this.props.title}: </strong></label>
					<input type="text" ref="newText" defaultValue={this.props.placeHolder} className="form-control"/>
					<button onClick={this.save} type="submit" className="btn btn-success btn-small pull-right">Save</button>
					<button onClick={this.cancel} className="btn btn-warning btn-small pull-right">Cancel</button>
				</div>
			</form>)
	},
	renderDisplay: function(){
		return (<h5><strong>{this.props.title}: </strong>{this.props.placeHolder} 
					<button type="submit" className="btn btn-small btn-default" onClick={this.edit}>Edit</button>
				</h5>);
	},
	save: function(e){
		e.preventDefault();
		this.setState({editing: false});
		this.props.onChange(this.refs.newText.value, this.props.keyName);
	},
	cancel: function(e){
		e.preventDefault();
		this.setState({editing: false});
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