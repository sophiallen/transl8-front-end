var React = require('react');
var firebase = require('firebase');
var Link = require('react-router').Link;
var langData = require('./../../data/languages.js');

var UserDataForm = React.createClass({
	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function(){
		console.log('in form initial state, user: ' + this.props.user);
		return {
			languages: langData,
		}
	},
	componentWillMount: function(){
		console.log('in form will mount, current props.user: ' + this.props.currentUser);
	},
	handleSubmit: function(e){
		e.preventDefault();
		var self = this;
		// var isTeacher = this.refs.isTeacher.value;
		// console.log(isTeacher);
		firebase.database().ref('users/' + this.props.currentUser.uid).set({
		    userName: self.refs.name.value,
		    phone: self.refs.phone.value,
		    defaultFrom: self.refs.fromLanguage.value,
		    defaultTo: self.refs.toLanguage.value,
		    role: "student" 
		}) .then(function(result){
			console.log('successfully saved data');
			self.context.router.replace('/dashboard'); //re-route to account setup
		}).catch(function(error){
			this.setState({error: error.message});
			console.log('error: ' + error.message);
		});
	},
	createLangItem: function(item, index){
		return <option key={index} value={item.langCode}>{item.langName}</option>
	},
	radioChange: function(){
		console.log("heard change");
	},
	render: function(){
		var error = this.state.error? <p>this.state.error</p> : '';
		return (<div>
				<h3 className="page-header">Registration Step Two: Set Your Preferences</h3>
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
					<div className="form-group">
						<label>(Optional) Special Roles:</label><br/>
					    <input type="radio" ref="isTeacher" onChange={this.radioChange}/>Teacher <br/>
				        <input type="radio" ref="isStudent" onChange={this.radioChange}/>Student
				  	</div>
					{error}
					<button type="submit" className="btn btn-primary">Save Preferences</button>
					<h4>Want to learn more about how preferences work? <Link to="/about">Click here for more information.</Link></h4>
				</form>
			</div>)
	}
});

module.exports = UserDataForm;
