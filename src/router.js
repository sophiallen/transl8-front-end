var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
//var hashHistory = ReactRouter.hashHistory;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;

var authenticate = require('./utils/authenticate.js');

var App = require('./components/App.js');
var Home   = require('./components/Home.js');
var About = require('./components/About.js');
var LoginForm = require('./components/Login.js');
var ParamTest = require('./components/ParamSample.js');
var Register = require('./components/Register.js');
var NotFound = require('./components/NotFound.js');

var routes = (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="/about" component={About} />
				<Route path="/about/:testparam" component={ParamTest} />
				<Route path="/login" component={LoginForm} />
				<Route path="/register" component={Register} />
				<Route path="*" component={NotFound} />
			</Route>
		</Router>
	);

module.exports = routes;