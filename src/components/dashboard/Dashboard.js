var React = require('react');
var firebase = require('firebase');
var UserSettingsView = require('./UserSettings.js');
var ActivityGrid = require('./ActivityGrid.js');
var langData = require('./../../data/languages.js');
var Chart = require('./chartTest.js');

var dashboard = React.createClass({
	contextTypes: { //allow access to router via context
		router: React.PropTypes.object.isRequired,
		userData: React.PropTypes.object,
		userMessages: React.PropTypes.object
	},
	componentWillMount: function(){
		//small optimization: check to see if redirected from login as check for login status.
		var justLoggedIn = (this.props.location.state && this.props.location.state.loggedIn);
		
		if (!this.props.loggedIn && !justLoggedIn) {
			var thisRouter = this.context.router;
			var that = this;

			firebase.auth().onAuthStateChanged(firebaseUser => { 
				if (firebaseUser === null){
					//re-route to login page.
					thisRouter.push({
						pathname: '/login',
						state: {fromPage: '/dashboard'}
					});
				} else {
					console.log('in dash will mount, user logged in');
				}
			});
		} 
	},
	update: function(newDetailData, keyName){
		var details = this.context.userData;
		details[keyName] = newDetailData;

		var updates = {};
		updates['/users/' + this.props.currentUser.uid + '/' + keyName] = newDetailData;
		var that = this;

		this.props.onChange(details);

		firebase.database().ref().update(updates).then(function(response){
			console.log('in firebase promise, details: ' + details);
			that.props.onChange(details);
		});
	},
	addSampleClass: function(){
		//create a new class id 
		console.log("adding a new teacher-class!");
		var newClassID = firebase.database().ref().child('teacher-classes/' + this.props.currentUser.uid).push().key;

		var newClass = {
			name: 'English 400',
			//temp: using names for now until sample student accounts created. 
			students: ["Sam", "Georgette"],
			studentIds: ["//student id one goes here", "//studend id two goes here"],
			cardSets: [],
			pendingCardSets: []
		}

		var updates = {};
		updates['teacher-classes/' + this.props.currentUser.uid + "/" + newClassID] = newClass;
		firebase.database().ref().update(updates);


	},
	getUserClasses: function(){
		console.log("Retrieving teacher classes....");
		// var classes = firebase.database.
		var userClasses;
		var that = this;
		var classesRef = firebase.database().ref('/teacher-classes/' + this.props.currentUser.uid);
		classesRef.once('value').then(function(snapshot) { //get intial details
			userClasses = snapshot.val();
			console.dir(userClasses);
			that.setState({userClasses: userClasses});
		});
	},
	addSampleStudent: function(studentName, classTitle){
		studentName = "Hawi";
		classTitle = "English 210";
		console.log("adding Hawi to English 210....");
		console.log(this.state.userClasses);
		var classes = this.state.userClasses;
		for (cls in classes){
			var currentClass = classes[cls];
			if (currentClass.name === classTitle){
				currentClass.students.push(studentName);
			}
		}

		var updates = {};
		updates['teacher-classes/' + this.props.currentUser.uid + "/"] = classes;
		firebase.database().ref().update(updates);
		this.setState({userClasses: classes});
		console.log("student added.");
	},
	getStudentActivity: function(){
		var current; 
		var classObj = this.state.userClasses;
		for (classId in classObj){
			if (classObj[classId].name === "English 400"){
				console.log("found correct class");
				current = classObj[classId];
			}
		}
		this.setState({studentMessages: {}});
		for (var i = 0; i < current.students.length; i++){
			var studentName = current.students[i];
			var studentid = current.studentIds[i];
			console.log("loading data for student:" + studentName);
			this.getStudentMessages(studentName, studentid);
		}
	},
	getStudentMessages: function(studentName, studentId){
		var that = this;
		firebase.database().ref('/user-messages/' + studentId).on('child_added', function(data) {
			var messages = that.state.studentMessages[studentName] == null? [] : that.state.studentMessages[studentName];
			messages.push(data.val());
			var studentMessages = that.state.studentMessages;
			studentMessages[studentName] = messages;
			that.setState({studentMessages: studentMessages});
		});
	},
	showStudentActivity: function(){
		var studentMessages = this.state.studentMessages;
		for (student in studentMessages){
			console.log(student);
			console.dir(studentMessages[student]);
		}
	},
	addSampleData: function(){
		var today = new Date();
		var message = {
			date: today.toDateString(),
			untranslated: 'hello world',
			direction: 'en-es',
			translated: 'hola mundo'
		}

		var newPostKey = firebase.database().ref().child('user-messages/' + this.props.currentUser.uid).push().key;
		console.log(newPostKey);

		var updates = {};
		updates['user-messages/' + this.props.currentUser.uid + '/' + newPostKey] = message;
		firebase.database().ref().update(updates);
	},
	render: function(){
		var activityView;
		var cardDeck;
		var cardViewer;

		if (this.props.currentUser){
			activityView = <ActivityGrid user={this.props.currentUser}/>
			chart = <Chart user={this.props.currentUser} />
		} else {
			activityView = <p>Loading data...</p>
			chart = <p></p>
		}
		return (
			<div className="dashboard">
				<h1 className="page-header">User Dashboard</h1>
				<div className="row">

					<div className="settings col-md-7">
						<UserSettingsView userData={this.context.userData} onChange={this.update} langData={langData}/>
					</div>

					<div className="col-md-5 userPieChart">
						<h3>Your Language Use</h3>
						{chart}
					</div>
				</div>

				<div className="activity-feed">
					<h3>Recent Translations</h3>
					{activityView}	
				</div>
				<button className="btn btn-default" onClick={this.addSampleData}>Add Sample Translation Data</button>
				<button className="btn btn-default" onClick={this.addSampleClass}>Add Sample Class Data</button>
				<button className="btn btn-default" onClick={this.getUserClasses}>Get User Classes</button>
				<button className="btn btn-default" onClick={this.addSampleStudent}>Add Sample Student</button>
				<button className="btn btn-default" onClick={this.getStudentActivity}>Get Student Activity</button>
				<button className="btn btn-default" onClick={this.showStudentActivity}>Display Student Activity</button>
			</div>
		);
	}
});

module.exports = dashboard;