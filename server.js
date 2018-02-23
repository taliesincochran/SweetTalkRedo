//Set up dependencies
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const path = require("path");
const routes = require("./controllers/controller.js");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Set up middleware
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);
require('./app/routes.js')(app,passport,io);
app.use(session({
	secret: 'thereOnceWasAManNamedMcGee',
	cookie: {maxAge: 24* 60* 60 * 1000},
	unset: 'destroy',
	resave: true,
	saveUninitialized: false,
	stort: store
}));

//Set up the view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Configure MongoDB server
const MONGOD_URI = process.env.MONGOD_URI || 'mongodb://localhost:27017/sweet-talk';
mongoose.Promise = Promise;
mongoose.connect(MONGOD_URI).then(result => {console.log('Connected to mongo db ' + result.connections[0].name)}).catch(error=> console.log("There was an error: ", error));
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({uri: MONGODB_URI,
collection: 'sessions'});
store.on('error', function(error) {
	assert.ifError(error);
	assert.ok(false);
});

//Set up server
const PORT = process.env.PORT || 3000;
server.listen(PORT,	function() {console.log('Server is listening on ' + PORT);
})