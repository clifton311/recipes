var mysql = require('mysql')
var bcrypt = require('bcrypt')
const saltRounds = 10;
var db = require('./db.js')
const { check, validationResult } = require('express-validator');
var passport = require('passport')


var selectAll = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if(err) {
      res.sendStatus(500)
    } else {
      res.send(results)
    }
  });
};

const registerUser = (req, res) => {
  const password = req.body.password
  // Store hash in your password DB.
  bcrypt.hash( password, saltRounds, (err, hash) => {
    let sql = `INSERT INTO users (firstName, lastName, email, userName, password) VALUES (?,?,?,?,?)`;
    let params = [req.body.firstName, req.body.lastName, req.body.email, req.body.userName, hash]

    db.query(sql, params ,(err, results) => {
      if (err) {
        res.sendStatus(500)
        console.log(err)
      } else {
        console.log(`Success! Added to the database!`, results);
        // res.send(results)
      }
    });

      db.query('SELECT LAST_INSERT_ID() as user_id', (error, results, fields) => {
        if (error) throw error;
        const user_id = results[0]
        console.log('Bcrypt --->',results[0]);
        req.login(user_id, err => {
          return res.redirect('/')
        })
      })
  });
};


passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
   done(null, user_id);
});

module.exports = {
  selectAll,
  registerUser
}