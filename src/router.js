var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;

var App = require('./components/App.js');
var Home   = require('./components/Home.js');
var About = require('./components/About.js');
var LoginForm = require('./components/Login.js');
var ParamTest = require('./components/ParamSample.js');

var routes = (
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/about" component={About} />
				<Route path="/about/:testparam" component={ParamTest} />
				<Route path="/login" component={LoginForm} />
			</Route>
		</Router>
	);

module.exports = routes;