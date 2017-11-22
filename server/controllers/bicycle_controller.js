var mongoose = require('mongoose');
var Bike = mongoose.model('Bike');
var User = mongoose.model('User');

var path = require('path');
module.exports = {
  register: function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
      if(err) {
        console.log("register error from controller");
      }
      else {
        if(user == null) {
          var user = new User(req.body);
          user.save(function(err) {
            if(err) {
              console.log(err);
              res.json(err);
            }
            else {
              res.json("success");
            }
          })
        }
        else {
          res.json("email existed");
        }
      }
    })
  },

  login: function(req, res) {
    console.log("from controller login: ", req.body.email);

    User.findOne({email: req.body.email}, function(err, user) {
      if(err) {
        console.log("can't find user email from login controller", err);
      }
      else {
        if(user == null) {
          res.json({error: "email invalid"});
        }
        else {
          if(user.password == req.body.password) {
            console.log("from controller login", user)
            res.json(user);
          }
          else {
            res.json({error: "password is not correct."})
          }
        }
      }
    })
  },

  createBikes: function(req, res) {
    console.log("from controller createBikes: ", req.body);
    User.findOne({_id: req.params.id}, function(err, user) {
      console.log("from create bike controller,", req.body)
      var bike = new Bike(req.body);
      bike._user = user._id;
      bike.save(function(err) {
        if (err) {
          console.log("controller creat bike relationship", err);
        }
        else {
          user._bikes.push(bike);
          console.log("controller creat bike successfully");
          user.save(function(err) {
            if (err) { console.log(err); }
            else { console.log("create successfully"); }
          })
        }
      })
    })
  }


  
  
  
}
