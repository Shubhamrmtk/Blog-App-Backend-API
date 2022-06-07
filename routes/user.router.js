const router=require("express").Router()
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()
const {createToken,verifyToken}=require("../Auth.jwt/Jwtverifiacation")


router.get("/get",async(req,res)=>{
  try {
    const info=await prisma.user.findMany({include:{posts:true}})
    res.send(info)
    
  } catch (error) {
    res.send(error.messege)
    
  }
})

router.post("/create_user",async(req,res)=>{
  try {
    const {name,password,email}=req.body
    const user = await prisma.user.create({
      data: {

        name,
        password,
        email

      },
    })
    res.send("your Id created ")
  } catch (error) {
    res.send(error.messege)
    
  }
  
})
router.post("/login",async(req,res)=>{
  try {
    const {email,password}=await req.body
    // console.log(email)
    const userinfo= await prisma.user.findMany({where:{email}})
    // console.log(userinfo)
    if (email==userinfo[0].email){
      const token=createToken(userinfo[0].id)
      console.log(token)
      res.cookie("authtoken",token)
      res.send('your login sucssesfuly')


    }
    
    

    // console.log(userinfo);
    
  } catch (error) {
    // console.log(error.messege)
    res.send("somthing is wrong")
    
  }
})


module.exports=router
