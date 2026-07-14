import patientServices from "../services/patientServices.js"
async function getAllPatients(req,res){
    try{
        const filters=req.query
        const result=await patientServices.getAllPatients(filters)
        res.status(200).json(result)
    }catch(err){
        console.log("Error occured ",err)
      res.status(501).json("Enternal server error")

    }
}

export default{
    getAllPatients
}