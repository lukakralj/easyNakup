
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

const UserRoute = require('./userRouter');
const userController = require('./usercontroller')

mongoose.connect("mongodb://localhost/hack", { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', UserRoute);

app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});

app.get('/', (req, res)=>{
  userController.getAllUsers().then((users)=>{
    res.send(users)
    console.log(users)
  })
})


