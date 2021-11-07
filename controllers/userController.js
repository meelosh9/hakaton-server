const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

const token = require('../config/token')
const saltRounds = 10;
const location = require('./locationController.js')
const Location = require('../models/locationModel.js')

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

    User.find({ _id: `${req.query.user_id}`})
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
                    },function (errCreate, datat) {
                        if (errCreate) console.log(errCreate)
                        let jwtoken =token.generateAccessToken(datat)
                        let fin = {
                            token : jwtoken,
                            podaci :{datat}
                        }
                        res.send(fin)
                    
                })     
            }
            )    
        }
})
}
const deleteUser= (req, res, next) =>{
    User.deleteOne({ _id: `${req.params.user_id}` });
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
    User.findOne({ _id: `${req.body.user_id}`}, (err,data) => {
        console.log(data.locations_visited)
        if (err) 
            console.log(err);
        if(data){
            var obj = {
                _id: req.body.latlon_id,                    
                time_visited: Date()
            }
            data.locations_visited.push(obj)
            var visitors_u = data.locations_visited.filter(element => element.time_visited.getTime() > Date.now() - 432000000)
            let currpositive
            if(data.is_positive && positive_date.getTime() > Date.now() - 1000*60*60*14){
                currpositive = false
            }
            User.findOneAndUpdate({ _id: `${req.body.user_id}`}, {'locations_visited' : visitors_u, 'is_positive' : currpositive}, (err,data)=>{
                if (err) console.log(err)
                location.createOrUpdateLocation(req,res)
            })
        }
    })
    
    
}
const updateInfected =  (req, res, next) => {
    User.findOne({'_id':req.body.user_id},{'is_positive' : true,positive_date: Date()},(err,data)=>{
        Location.find( {'_id' : {$in: data.locations_visited._id}}, (errloc,dataloc)=>{
            let positive = 0
            dataloc.visitors.forEach(element => { 
                if(element._id == req.body.user_id)
                element.is_positive = true
                if(element.is_positive)
                    positive++
            });
            dataloc.percentage = positive/dataloc.visitors.lenght
            Location.findOneAndUpdate({'_id':dataloc._id},{'visitors' : true,positive_date: Date()})
        })
    }) 

}
module.exports ={
    users,
    userById,
    createUser,
    deleteUser,
    updateUserInfo,
    updateLocations

}