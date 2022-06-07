const router=require("express").Router()
const {PrismaClient}=require("@prisma/client")
const prisma=new PrismaClient()
const {createToken,verifyToken}=require("../Auth.jwt/Jwtverifiacation")

router.get("/user",async(req,res)=>{
  try {
    const reationData=await prisma.reaction.findMany({})
    res.send(reationData)
  } catch (error) {
    res.send(error.message)
  }
})

router.post("/user/react/:postId",verifyToken,async(req,res)=>{
  try {
    const{like=false,dislike=false}=req.body
    if(like && dislike){ return res.send("invalid input")}
    // console.log(req.params.postId)
    const reactionData=await prisma.reaction.findMany({where:{userId:req.userId,postId:parseInt(req.params.postId)}})
    if(reactionData.length){
      await prisma.reaction.updateMany({where:{userId:req.userId,postId:parseInt(req.params.postId)},data:{like,dislike}})
      res.send('your reaction updated')
    }else{
      await prisma.reaction.create({data:{like,dislike,userId:req.userId,postId:parseInt(req.params.postId)}})
      res.send('your reaction is applies')
    }

  } catch (error) {
    res.send(error.message)
    
  }
})


module.exports=router