let mongoose = require('mongoose')


let adminCredential = mongoose.Schema({
    email: String,
    password:String
})

module.exports=mongoose.model('adminCredential',adminCredential)