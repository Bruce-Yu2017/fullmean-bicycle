var mongoose = require('mongoose');
var Bike = mongoose.model('Bike');
var User = mongoose.model('User');

var path = require('path');
module.exports = {
  register: function(req, res) {
    console.log("from controller register: ", req.body);
    var user = new User({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password});

    // User.pre("save", function(done) {
    //   bcrypt.hash(this.password, 3)
    //   .then(hashed_password => {
    //     this.password = hashed_password;
    //     done();
    //   })
    //   .catch(error => {
    //     console.log("from controller bcrypt: ", error);
    //     done();
    //   })
    // })

    user.save(function(err, user) {
      if(err) {
        console.log("can't create a user", err);
        res.json({err:err});
      }
      else {
        res.json(user);
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
        console.log("from controller login", user);
        res.json(user);
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
