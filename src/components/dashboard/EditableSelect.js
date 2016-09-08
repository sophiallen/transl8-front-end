var React = require('react');


var EditableSelect = React.createClass({
	getInitialState: function(){
		return {editing: false}
	},
	edit: function(){
		this.setState({editing: true});
	},
	save: function(e){
		e.preventDefault();
		this.setState({editing: false});
		this.props.onChange(this.refs.newSelection.value, this.props.keyName);
	},
	renderDisplay: function(){
		return (<h4>
					<strong>{this.props.title}: </strong>{this.props.placeHolder} 
					<button className="btn btn-small btn-default" onClick={this.edit}>Edit</button>
				</h4>)
	},
	createSelectItem: function(item, index){
		return <option key={index} value={item.langCode}>{item.langName}</option>
	},
	renderForm: function(){
		//Todo: extract the language name for placeholder, instead of langcode.
		return (
				<div className="form-group">
					<label>{this.props.title}</label>
					<select ref="newSelection" className="form-control">
						<option value="none">None </option>
						{this.props.selectionData.map(this.createSelectItem)}
					</select>
					<button type="submit" className="btn btn-small btn-default" onClick={this.save}>Save</button>
				</div>
			);
	},
	render: function(){
		if (this.state.editing){
			return this.renderForm();
		} else {
			return this.renderDisplay();
		}
	}
});

module.exports = EditableSelect;