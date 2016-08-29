var React = require('react');
var ReactDOM = require('react-dom');

var HomePage = require('./components/MainLayout.js');
var routes = require('./router.js');

ReactDOM.render(routes, document.getElementById('app'));