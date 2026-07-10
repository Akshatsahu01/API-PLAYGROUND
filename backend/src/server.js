import app from "./app.js"
import "./config/env.js"
import pool from "./config/db.js"

console.log(process.cwd())
const port=process.env.PORT

async function startserver(){
    try{
         await pool.query("SELECT NOW()")
         console.log("Postgresql server is running successsfully")
         app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
    }catch(err){
            console.log(`error  is : ${err}`)
    }
}
startserver()

