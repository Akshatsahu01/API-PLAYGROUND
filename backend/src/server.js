import "./config/env.js"
import app from "./app.js"
import pool from "./config/db.js"

console.log(process.cwd())
const port=process.env.PORT || 3000

async function startserver(){
    try{
         app.listen(port,"0.0.0.0",()=>{
         console.log(`server is running on port ${port}`)
})
    }catch(err){
            console.log(`error  is : ${err}`)
    }
}
startserver()

