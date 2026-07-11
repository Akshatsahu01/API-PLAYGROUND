import doctorModel from "../models/doctorModel.js";

async function getAllDoctors() {
  return await doctorModel.getAllDoctors();
}

export default {
  getAllDoctors,
};