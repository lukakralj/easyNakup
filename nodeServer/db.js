var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/hack', { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

User = mongoose.model('User', userSchema);



function addUser(user_json_details) {
    var newUser = new User(user_json_details);
    newUser.save(function (err, newUser) {
        if (err) return console.error(err);
    });
}

module.exports = {
    User,
    addUser
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("somebody connected to the database");
});