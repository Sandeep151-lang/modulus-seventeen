const mongoose = require('mongoose')

const crud = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type :String}
   
})

module.exports = mongoose.model('crud',crud)