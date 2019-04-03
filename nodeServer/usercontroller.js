const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }


const UserSchema = new Schema({
    user: {
        type: String
    },
    phone:{
        type: String
    },
    email: {
        type: String
    },
    orderJSON: {
        type : String
    },
    address : {
        type: String
    },
    city : {
        type : String
    },
    country : {
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
    getAllUsers
}