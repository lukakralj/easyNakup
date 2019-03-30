const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    }
}, {
        collection: 'users'
    });

var User = mongoose.model('User', UserSchema)


function addUser(user_json_details) {
    var newUser = new User(user_json_details);
    newUser.save(function (err, newUser) {
        if (err) return console.error(err);
    });
}
function removeUsers() {
    User.find({}, function(users){
        console.log(users)
    })
    User.deleteMany({name : "Danilo Del Busso"},function (err, removed) {
        console.log(removed)
    });
}


async function getAllUsers() {
   let out = null;
    let done = false
    User.find({}, function(err, users){
        out = users;
        done = true;
    });

    while(!done){
       await sleep(10)      
    }

    return out;
}


module.exports = {
    User,
    addUser,
    getAllUsers,
    removeUsers
}