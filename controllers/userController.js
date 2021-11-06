const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const saltRounds = 10;


const users = (req, res, next) =>{
    User.find({})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message : `${error}`
        })
    })
}

const userById = (req, res, next) =>{
    User.find({ _id: `${req.body.user_id}`})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message : `${error}`
        })
    })
}

const createUser = (req, res, next) =>{
    User.find({$or: [
        { 'document_id' :req.body.document_id },
        { 'username': req.body.username },
        { 'email': req.body.email }
      ]},function (erru, data) {
        if (erru) console.log(erru);      
        if(data.lenght == 0 || data.lenght == undefined)
            {
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    User.create({
                        document_id: req.body.document_id,
                        username: req.body.username,
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        adress: req.body.adress,
                        is_positive: false,
                        positive_date: null,
                        is_vaccinated: false,
                        vaccine_dose_date : null,
                        vaccine_dose_n : 0,
                        locations_visited: [],
                        credits : 0  
                    },function (errCreate, data) {
                        if (errCreate) console.log(errCreate)
                        res.send(data)
                    
                })     
            }
            )    
        }
})
}
const deleteUser= (req, res, next) =>{
    User.deleteOne({ _id: `${req.body.user_id}` });
}
const updateUserInfo = (req, res ,next ) => {
    User.findOneAndUpdate({ _id: `${req.body.user_id}` }, {
        document_id: req.body.document_id,
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        adress: req.body.adress,
        is_positive: req.body.is_positive,
        positive_date: req.body.positive_date,
        is_vaccinated: req.body.is_vaccinated,
        vaccine_dose_date : req.body.vaccine_dose_date,
        vaccine_dose_n : req.body.vaccine_dose_n,
        credits : req.body.credits  
    }, (err, data) => {
        if (err) console.log(err)
        res.send(data)
    }) 
}
const updateLocations = (req, res, next) => {
    let user;
    User.findOne({ _id: `${req.body.user_id}`})
    .then(response => {
        user = response
    })
    .catch(error => {
        res.json({
            message : `${error}`
        })
    })
    if(user.locations_visited[user.locations_visited.lenght -1].time_visited)
        console.log("2")
}

module.exports ={
    users,
    userById,
    createUser,
    deleteUser,
    updateUserInfo

}