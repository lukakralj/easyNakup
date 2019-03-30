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


function addBunchOfUsers(){

    let u1 = {
        "user" : "Luka Kralj",
        "email" : "luka.kralj@gmail.com",
        "phone" : "447480362993",
        "city" : "Budimír",
        "country" : "Slovakia",
        "address" : "Budimír 25, 044 43",
        "orderJSON" : "{'eggs' : 12,'milk' : '3L','pen' : '1 pack','flamethrower' : 1}"
    }

    let u2 = {
        "user" : "Danilo Del Busso",
        "email" : "danilo@gmail.com",
        "phone" : "447480362993",
        "city" : "Kosice",
        "country" : "Slovakia",
        "address" : "Trieda KVP 1",
        "orderJSON" : "{'eggs' : 2,'pen' : '1 pack','flamethrower' : 1,'fire' : '1 gallon'}"
    }

    let u3 = {
        "user" : "Alvaro Guiard",
        "email" : "alvaro@gmail.com",
        "phone" : "447480362993",
        "city" : "Košice",
        "country" : "Slovakia",
        "address" : "Južné nábrežie 1047/13",
        "orderJSON" : "{'eggs' : 32,'pen' : '2 packs','flamethrower' : 1}"
    }

    let u4 = {
        "user" : "Silvio Berlusconi",
        "email" : "silvio@gmail.com",
        "phone" : "447480362993",
        "city" : "Košice",
        "country" : "Slovakia",
        "address" : "Mánesova 23, 040 01",
        "orderJSON" : "{'bunga' : 1,' bunga' : 3,'flamethrower' : 1200}"
    }
    
    let users = [u1, u2, u3, u4]
    users.forEach((u)=>{
        var newUser = new User(u);
        newUser.save(function (err, newUser) {
            if (err) return console.error(err);
        });
    })
    
}


module.exports = {
    User,
    addUser,
    getAllUsers,
    addBunchOfUsers
}