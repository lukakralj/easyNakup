const Nexmo = require("nexmo");
const cmd = require("node-cmd");
const nexmo = new Nexmo({
  apiKey: "5fe9b30c",
  apiSecret: "ymooFIsoylWeGo7l"
});

const express = require("express");
const UserRouter = express.Router();
const user_controller = require("./usercontroller");
const User = user_controller.User;

keys = ["123"];

UserRouter.route("/add").post(function(req, res) {
  if (isKeyValid(req.body.key) || true) {
    const user = new User(req.body);
    user
      .save()
      .then(user => {
        res.json("User added successfully");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  } else {
    res.json("INVALID KEY");
  }
});

function isKeyValid(key) {
  return keys.includes(key);
}

UserRouter.route("/addKey").post(function(req, res) {
  keys.push(req.body.key);
  res.json("Added key " + req.body.key);
});

UserRouter.route("/deleteAllKeys").get(function(req, res) {
  keys = [];
  res.json("Removed all keys");
});

UserRouter.route("/removeall").post(function(req, res) {
  User.deleteMany({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

UserRouter.route("/getUser").get(function(req, res) {
  User.find(req.body.name, function(err, foundUser) {
    if (err) {
      res.send(err);
    } else {
      res.send(foundUser);
    }
  });
});

UserRouter.route("/getAll").get(function(req, res) {
  user_controller.getAllUsers().then(allusers => {
    res.send(allusers.filter(order => order.orderJSON !== "{}"));
  });
});

UserRouter.route("/remove").post(function(req, res) {
  console.log("removing order with id", req.body._id);
  try {
    User.findOne({ _id: req.body._id }, function(err, result) {
      result.remove(err => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
      // or simply use
    });
  } catch (e) {
    res.send(e);
  }
});

UserRouter.route("/sendSMS").post(function(req, res) {
  const opts = {
    type: "unicode"
  };
  text = `Your order is on its way!\n💰 Amount: ${req.body.amount}€\n⌛ ETA: ${
    req.body.eta
  }\n\n\nReceipt\n--------------------------\nItem | Quantity | Amount\n--------------------------\n${
    req.body.list
  }`;

  nexmo.message.sendSms(
    req.body.from,
    req.body.to,
    text,
    opts,
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          console.log("Message sent successfully.");
        } else {
          console.log(
            `Message failed with error: ${
              responseData.messages[0]["error-text"]
            }`
          );
        }
      }
    }
  );
});

UserRouter.route("/image").post((req, res1) => {
  const fs = require("fs");
  uri = req.body.url;
  console.log(req.body);
  const request = require("request");
  request.head(uri, function(err, res, body) {
    /* console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);*/

    request(uri)
      .pipe(fs.createWriteStream("people/i.jpg"))
      .on("close", () => {
        command =
          "python3 " +
          "../dragonboard/app/FaceRecognition.py " +
          __dirname +
          "/people/i.jpg " +
          __dirname +
          "/../dragonboard/app";
        cmd.get(command, (err, data, stderr) => {
          console.log(command);
          if (data) res1.json(data);
          else res1.json(false);
        });
      });
  });
});

module.exports = UserRouter;
