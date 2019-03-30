
const express = require('express');
const UserRouter = express.Router();
const user_controller = require('./usercontroller');
const User = user_controller.User;

keys = ["123"]

UserRouter.route('/add').post(function (req, res) {
  if (isKeyValid(req.body.key)) {
    const user = new User(req.body);
    user.save()
      .then(user => {
        res.json('User added successfully');
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  }
  else{
    res.json("INVALID KEY")
  }
});

function isKeyValid(key){
  return keys.includes(key)
}

UserRouter.route('/addKey').post(function (req, res){
  keys.push(req.body.key);
  res.json("Added key "+req.body.key)
});

UserRouter.route('/deleteAllKeys').get(function (req, res){
  keys = []
  res.json("Removed all keys")
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


UserRouter.route('/remove').post(function (req, res) {
  console.log("removing order with id", req.body._id);
  try {
    User.findOne({ _id: req.body._id }, function (err, result) {
      result.remove((err) => {
        if (err) {
          res.send(err)
        }
        else {
          res.send(result)
        }
      });
      // or simply use
    })
  }
  catch (e) {
    res.send(e)
  }
});
module.exports = UserRouter;