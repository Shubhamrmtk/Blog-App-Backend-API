const router=require("express").Router()
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()
const {createToken,verifyToken}=require("../Auth.jwt/Jwtverifiacation")

router.post("/user",verifyToken,async(req,res)=>{
  try {
    const {title,published}=req.body
    console.log(title,published)
    const id=req.userId
  const post = await prisma.post.create({data:{title,published,autherId:parseInt(id)
    },include:{reactions:true}})
    console.log(post)
    res.send(post)

    
  } catch (error) {
    res.send(error.messege)
    
  }

})



router.get("/user",async(req,res)=>{
  try {
    const postData=await prisma.post.findMany({include:{reactions:true}})
    res.send(postData)
  } catch (error) {
    res.send(error.messege)
    
  }
})

router.get("/user/:id",async(req,res)=>{
  try {
    const postData=await prisma.post.findUnique({where:{id:parseInt(req.params.id)}})
    res.send(postData)
    
  } catch (error) {
    res.send(error.messege)
    
  }
})

module.exports=router

