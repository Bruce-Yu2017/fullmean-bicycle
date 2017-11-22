var bicycle = require('../controllers/bicycle_controller.js');
var path = require('path');

module.exports = function(app){
  app.post("/register", function(req, res) {
    bicycle.register(req, res);
  })

  app.post("/login", function(req, res) {
    bicycle.login(req, res);
  })

  app.post("/user/:id/bike", function(req, res) {
    bicycle.createBikes(req, res);
  })

  app.all("*",function(req,res){
    res.sendFile('index.html', { root: './client/dist' });
  })


}
