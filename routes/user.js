const user = require('../controllers/userController.js')
const express = require("express")
const router = express.Router()



router.get('/',user.userById)   

// router.get('/:user_id',user.userById)

router.post('/',user.createUser)       

 router.put('/infected',user.updateInfected)

router.put('/userinfo',user.updateUserInfo)
router.put('/locations',user.updateLocations)  //na lokaciji

router.delete('/:user_id',user.deleteUser)                       

module.exports = router