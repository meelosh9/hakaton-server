const Location = require('../models/locationModel.js')
const { ObjectId } = require('bson')

const locations = (req, res, next) =>{
    Location.find({})
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

const LocationById = (req, res, next) =>{
    location.find({ _id: `${req.body.location_id}`})
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

const createOrUpdateLocation = (req, res, next) => {            
    Location.findOne({ 'latlon_id' :req.body.latlon_id },function (erru, data) {
        if (erru) 
            console.log(erru);    
        //console.log(!data)  
        if(!data){
            console.log("zasto??")  
            Location.create({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            visitors: [{
                _id: req.body.user_id,                    
                time_visited:Date(),    
                is_positive: req.body.is_positive
            }],
            percentage_infected:+req.body.is_positive                ,
            latlon_id: `${req.body.latitude}`+`${req.body.longitude}`
            },function (errCreate, data) {
                if (errCreate) console.log(errCreate)
                res.send(data)
                
            })     
        }
        else{
            //console.log(Array.isArray(data[0].visitors))
            var obj = {
                _id: req.body.user_id,                    
                time_visited:Date(),
                is_positive: req.body.is_positive
            }
            console.log(data)
            //console.log(data[0].visitors)
            data.visitors.push(obj)                
            var visitors_u = data.visitors.filter(element => element.time_visited.getTime() > Date.now() - 432000000)
            data.visitors = visitors_u
            console.log(visitors_u)
            Location.findOneAndUpdate({'latlon_id' : data.latlon_id}, {'visitors' : visitors_u}, (err,data)=>{
                if (err) console.log(err)
                res.send(data)
            })
        }
                
    })
    
}


module.exports ={
    locations,
    createOrUpdateLocation,
    LocationById,
    
}