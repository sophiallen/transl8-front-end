var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;
var langData = require('./../../data/languages.js');

var UserDataForm = React.createClass({
	getInitialState: function(){
		console.log('in form initial state, user: ' + this.props.user);
		return {
			languages: langData,
		}
	},
	componentWillMount: function(){
		console.log('in form will mount, current user: ' + this.props.user);
	},
	handleSubmit: function(e){
		e.preventDefault();
		var self = this;
		firebase.database().ref('users/' + this.props.user.uid).set({
		    userName: self.refs.name.value,
		    phone: self.refs.phone.value,
		    defaultFrom: self.refs.fromLanguage.value,
		    defaultTo: self.refs.toLanguage.value 
		}) .then(function(result){
			console.log('successfully saved data');
		}).catch(function(error){
			console.log('error: ' + error.message);
		});
	},
	createLangItem: function(item, index){
		return <option key={index} value={item.langCode}>{item.langName}</option>
	},
	render: function(){
		return (<div>
				<h3 className="page-header">Your Preferences</h3>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label>Name:</label>
						<input className="form-control" ref="name" placeholder="Your name here" />
					</div>
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
