var React = require('react');

module.exports = React.createClass({
	handleSubmit: function(){
		console.log('clicked submit');
		
	},
	render: function(){
		return (
			<div>
				<h1 className="page-header">Account Login</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input className="form-control" ref="email" placeholder="email" />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" ref="pw" placeholder="password" />
					</div>
					<button type="submit" className="btn btn-primary">Register!</button>
				</form>
			</div>
		)
	}
});