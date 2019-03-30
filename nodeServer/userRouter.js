
const express = require('express');
const UserRouter = express.Router();
const user_controller = require('./usercontroller');
const User = user_controller.User;

UserRouter.route('/add').post(function (req, res) {
  const user = new User(req.body);
  user.save()
    .then(user => {
      res.json('User added successfully');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


UserRouter.route('/removeall').post(function (req, res) {
  User.deleteMany({}, function (err, result) {
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  })
});


UserRouter.route('/getUser').get(function (req, res) {
  User.find(req.body.name, function (err, foundUser) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(foundUser)
    }
  })
})

UserRouter.route('/getAll').get(function (req, res) {

  user_controller.getAllUsers().then((allusers) => {
    res.send(allusers)
  });
});

module.exports = UserRouter;