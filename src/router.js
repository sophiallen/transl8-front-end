var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;
//var Link  = require('react-router').Link;

var App = require('./components/MainLayout.js');
var Home   = require('./components/Home.js');
var About = require('./components/About.js');
var LoginForm = require('./components/LoginForm.js');

var routes = (
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/about" component={About} />
				<Route path="/login" component={LoginForm} />
			</Route>
		</Router>
	);

module.exports = routes;