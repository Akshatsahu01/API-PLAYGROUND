import doctorModel from "../models/doctorModel.js";

async function getAllDoctors(filters) {
  return await doctorModel.getAllDoctors(filters);
}

export default {
  getAllDoctors,
};