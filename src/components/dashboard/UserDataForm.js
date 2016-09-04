var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;

var UserDataForm = React.createClass({
	getInitialState: function(){
		return {
			languages: [
				{langName: 'English', langCode: 'en', key: 1},
				{langName: 'French', langCode: 'fr', key: 2},
				{langName: 'Spanish', langCode: 'es', key: 3}
			]
		}
	},
	handleSubmit: function(e){
		e.preventDefault();
		console.log(this.refs.fromLanguage.value);
	},
	createLangItem: function(item, index){
		return <option key={index} value={item.langCode}>{item.langName}</option>
	},
	render: function(){
		return (<div>
				<h1 className="page-header"> Change Your Preferences</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label>Your Phone Number</label>
						<input className="form-control" ref="phone" placeholder="###-###-####" />
					</div>
					<div className="form-group">
						<label>Default 'From' Language</label>
						<select ref="fromLanguage" className="form-control">
							<option value="none">None Set</option>
							{this.state.languages.map(this.createLangItem)}
						</select>
					</div>
					<div className="form-group">
						<label>Default 'To' Language</label>
						<select ref="toLanguage" className="form-control">
							<option value="none">None Set</option>
							{this.state.languages.map(this.createLangItem)}
						</select>
					</div>
					<button type="submit" className="btn btn-primary">Save Preferences</button>
					<h4>Why set your preferences? <Link to="/register">Click here to learn more.</Link></h4>
				</form>
			</div>)
	}
});

module.exports = UserDataForm;
