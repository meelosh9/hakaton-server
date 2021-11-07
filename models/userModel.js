const mongoose = require('mongoose')
const { ObjectId } = require('bson')
const { stringify } = require('querystring')
const Schema = mongoose.Schema

const userSchema = new Schema({
    document_id : {
        type : String
    },
    username : {
        type : String
    },
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    adress : {
        type : String
    },
    is_positive : {
        type : Boolean
    },
    positive_date : {
        type : Date
    },
    is_vaccinated : {
        type : Boolean
    },
    vaccine_dose_date : {
        type : Date
    },
    vaccine_dose_n : {
        type : Number
    },
    locations_visited: [{
        _id : {type : Schema.Types.ObjectId}, 
        time_visited : {type : Date}
    }],
    credits : {
        type : Number
    }

})


const User = mongoose.model('User',userSchema)
module.exports = User