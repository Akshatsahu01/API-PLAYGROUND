import patientModel from "../models/patientModel.js";
async function getAllPatients(filters){
    const result=await patientModel.getAllPatients(filters)
    return result
}

export default{
    getAllPatients,
}