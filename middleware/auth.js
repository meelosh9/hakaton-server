const jwt = require('jsonwebtoken')
const {getTokenID} = require('../config/token')

const auth = (req,res,next) =>{    
    if(req.headers["authorization"] != ""){
        try{
            req.body.user_id = getTokenID(req)
            next();
        }catch (e){
            res.status(401).send("token error")
        }
    }else{
        res.status(401).send("data missing")
    }
}
module.exports = auth