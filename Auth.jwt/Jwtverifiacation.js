
const jwt= require("jsonwebtoken");
const createToken=(id)=>{
  return jwt.sign(id,"shubham")
}

const verifyToken = async(req, res, next)=>{
  if(req.headers.cookie){
    const token = req.headers.cookie.split("=")[1]
    const id = await jwt.verify(token, "shubham")
    req.userId = parseInt(id)
    next()
}else{
  res.send(`please login`)
}

}



module.exports={createToken,verifyToken}