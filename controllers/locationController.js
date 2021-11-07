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
    Location.find({ _id: `${req.body.location_id}`})
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
const LocationMultiple = (req, res, next) => {
    let locations = []
    coordinates = JSON.parse(req.body.Cubes)
    var counter = 0
    var max = 0
    console.log(coordinates)
    coordinates.forEach(element => {
        max++
    })
    coordinates.forEach(element => {
        Location.find( {'latitude': element.latitude,'longitude': element.longitude},(err,data)=>{
            
            locations.push(data)
            counter++
            if(counter == max)
                res.send(locations)
        })
    });
    
}

const createOrUpdateLocation = (req, res, next) => {            
    Location.findOne({ 'latlon_id' :req.body.latlon_id },function (erru, data) {
        if (erru) 
            console.log(erru);    
        //console.log(!data)  
        if(!data){

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
            },function (errCreate, dataa) {
                if (errCreate) console.log(errCreate)
                res.send(dataa)
                
            })     
        }
        else{
            //console.log(Array.isArray(data[0].visitors))
            var obj = {
                _id: req.body.user_id,                    
                time_visited:Date(),
                is_positive: req.body.is_positive
            }

            //console.log(data[0].visitors)
            data.visitors.push(obj)                
            var visitors_u = data.visitors.filter(element => element.time_visited.getTime() > Date.now() - 432000000)
            data.visitors = visitors_u
            console.log(visitors_u)
            Location.findOneAndUpdate({'latlon_id' : data.latlon_id}, {'visitors' : visitors_u}, (err,dataa)=>{
                if (err) console.log(err)
                res.send(dataa)
            })
        }
                
    })
    
}


module.exports ={
    locations,
    createOrUpdateLocation,
    LocationById,
    LocationMultiple
    
}