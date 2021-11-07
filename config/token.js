const token_secret = "secretstringzajsonwebtoken"

const jwt = require("jsonwebtoken")

function generateAccessToken(user) {
    return jwt.sign({usename : user.username, password : user.password, id : user._id},token_secret, { expiresIn: '900s' });
  }

function getTokenID (req)  {
    const token = req.headers["authorization"].split(' ')[1];    
    decodedToken = jwt.verify(token,token_secret)
    return decodedToken.id;
}

  module.exports = {
      generateAccessToken,
      getTokenID            
  }
