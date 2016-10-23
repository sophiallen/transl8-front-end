var React = require('react');
var EditableText = require('./EditableText.js');
var EditableDropDown = require('./EditableSelect.js');

var UserSettingsView = React.createClass({

	render: function(){
		if (!this.props.userData){
			return <p>Loading...</p>
		} else {
		return (<div>
					<h3>Account Settings</h3>
					<EditableText title="Name" placeHolder={this.props.userData.userName} keyName="userName" onChange={this.props.onChange} />
					<EditableText title="Phone Number" placeHolder={this.props.userData.phone} keyName="phone" onChange={this.props.onChange} />
					<EditableDropDown title="Default 'From' Language" placeHolder={this.props.userData.defaultFrom} keyName="defaultFrom" selectionData={this.props.langData} onChange={this.props.onChange} />
					<EditableDropDown title="Default 'To' Language" placeHolder={this.props.userData.defaultTo} keyName="defaultTo" selectionData={this.props.langData} onChange={this.props.onChange} />			
				</div>)			
		}
	}
});

module.exports = UserSettingsView;