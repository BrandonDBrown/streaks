// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

// Connect to mongoDB database
// const mongoURL = 'mongodb://<dbuser>:<dbpassword>@<host>:<port>/<database-name>';
// serve FE pages
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const mongoURL = 'mongodb://localhost/habitDB';
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(mongoURL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// Habit model
let Account = mongoose.model('Account', {
  username : {type : String, unique : true, required : true } 
});
// Routing
router.get('/api/accounts', (req, res) => {
  Account.find(function(err, accounts) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
        res.send(err)
      }
    res.json(accounts); // return all todos in JSON format
  });
});

   // create todo and send back all todos after creation
   app.post('/api/accounts', function(req, res) {   
    // create a todo, information comes from AJAX request from Angular
    Account.create({
        username : req.body.username,
    }, function(err, account) {
        if (err) {
            res.send(err);
        }
        // res.redirect(307, 'http://localhost:8080/api/accounts' + res.data._id);
        // get and return all the todos after you create another
        Account.find(function(err, accounts) {
            if (err) {
                res.send(err);
            }
            res.json(accounts);
        });
    });
});

//Set app to use express backend router
app.use(router);

// Configure port
const port = 8080;
// Listen to port
app.listen(port);
console.log(`Server is running on port: ${port}`);