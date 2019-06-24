// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();

// Connect to mongoDB database
// const mongoURL = 'mongodb://<dbuser>:<dbpassword>@<host>:<port>/<database-name>';
const mongoURL = 'mongodb://localhost/habitDB';

mongoose.connect(mongoURL);
// serve FE pages
app.use(express.static('public'));


// Habit model
let Account = mongoose.model('Account', {
  username : String
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
        text : req.body.text,
    }, function(err, account) {
        if (err) {
            res.send(err);
        }
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