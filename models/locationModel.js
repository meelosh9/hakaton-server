const { ObjectId } = require('bson')
const mongoose = require('mongoose')
const { stringify } = require('querystring')
const Schema = mongoose.Schema

const locationSchema = new Schema({
    latitude : {
        type : Number
    },
    longitude : {
        type : Number
    },
    visitors : [{
        _id : {type : Schema.Types.ObjectId}, // to do: change to a list
        time_visited : {type : Date}, // to do: change to a list
        is_positive : {type : Boolean}
    }],
    latlon_id : {
        type : String
    },
    percentage : {
        type : Number
    }
})

const Location = mongoose.model('Location',locationSchema)
module.exports = Location