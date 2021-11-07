
const location = require('../controllers/locationController.js')
const express = require("express")
const router = express.Router()



router.get('/',location.locations)    

router.post('/manylocations',location.LocationMultiple)

// router.put('/',location.createOrUpdateLocation)        

// router.put('/',authAdmin,demoteUserToMember)  

// router.delete('/',removeUser)                       

module.exports = router