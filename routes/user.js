const user = require('../controllers/userController.js')
const express = require("express")
const router = express.Router()



router.get('/',user.users)    

router.post('/',user.createUser)        

// router.put('/',authAdmin,demoteUserToMember)  

// router.delete('/',removeUser)                       

module.exports = router