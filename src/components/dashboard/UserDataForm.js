var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;
var langData = require('./../../data/languages.js');

var UserDataForm = React.createClass({
	getInitialState: function(){
		return {
			languages: langData
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
						<label>Phone Number</label>
						<p><em>We will use this number to look up your preferences when you text the app.</em></p>
						<input className="form-control" ref="phone" placeholder="### - ### - ####" />
					</div>
					<div className="form-group">
						<label>Default 'From' Language</label>
						<select ref="fromLanguage" className="form-control">
							<option value="none">None</option>
							{this.state.languages.map(this.createLangItem)}
						</select>
					</div>
					<div className="form-group">
						<label>Default 'To' Language</label>
						<select ref="toLanguage" className="form-control">
							<option value="none">None</option>
							{this.state.languages.map(this.createLangItem)}
						</select>
					</div>
					<button type="submit" className="btn btn-primary">Save Preferences</button>
					<h4>Want to learn more about how preferences work? <Link to="/about">Click here for more information.</Link></h4>
				</form>
			</div>)
	}
});

module.exports = UserDataForm;
