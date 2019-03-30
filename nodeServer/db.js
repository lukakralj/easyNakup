var mongoose = require('mongoose');
var db = mongodb://localhost/hack;

mongoose.connect('', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("server connected to the database");
});

module.exports

