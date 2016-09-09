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
	cancel: function(e){
		e.preventDefault();
		this.setState({editing: false});
	},
	renderDisplay: function(){
		//get the display language based on lang code for display
		var code = this.props.placeHolder;
		var displayLang = this.props.selectionData.find(function(item){
			return item.langCode === code;
		});

		return (<h4>
					<strong>{this.props.title}: </strong> {displayLang? displayLang.langName : 'loading...'}
					<button className="btn btn-small btn-default" onClick={this.edit}>Edit</button>
				</h4>)
	},
	createSelectItem: function(item, index){
		return <option key={index} value={item.langCode}>{item.langName}</option>
	},
	renderForm: function(){
		return (
				<form className="form-inline">
					<div className="form-group">
						<label>{this.props.title}:   </label>
						<select ref="newSelection" className="form-control" defaultValue={this.props.placeHolder}>
							<option value="none">None </option>
							{this.props.selectionData.map(this.createSelectItem)}
						</select>
						<button type="submit" className="btn btn-small btn-success pull-right" onClick={this.save}>Save</button>
						<button className="btn btn-small btn-warning pull-right" onClick={this.cancel}>Cancel</button>
					</div>
				</form>
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