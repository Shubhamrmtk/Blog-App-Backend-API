const express = require("express");




const app=express()
app.use(express.json())

app.use("/auth",require("./routes/user.router"))
app.use("/post",require("./routes/post.router"))
app.use("/reaction",require("./routes/reaction.router"))







app.listen(4000,()=>{
  console.log(`your running on the port 30000`)
})