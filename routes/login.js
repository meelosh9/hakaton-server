const express = require('express')
const router = express.Router()

const user = require('../models/userModel')

const token = require('../config/token')
const bcrypt = require('bcrypt')
const saltRounds = 10;


router.post('/',(req,res)=>{
    user.findOne({'username': req.body.username},(err,data)=>{
        if(data)
        {bcrypt.compare(req.body.password, data.password, function(erru, result) {
            if(result){
                var currentToken = token.generateAccessToken(data)
                res.send({token: currentToken, podaci: {data}});
                return;
            }else{
                res.status(401).send({
                    error: "Incorrect password"})
            }
        })}
        else{
            res.status(404).send({
                error: "User not found"})
        }
    })
 
})

module.exports = router