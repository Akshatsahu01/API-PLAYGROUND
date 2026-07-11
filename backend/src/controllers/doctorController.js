import doctorServices from "../services/doctorServices.js";

async function getAllDoctors(req, res) {
  try {
    const doctors = await doctorServices.getAllDoctors();

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch doctors",
    });
  }
}

export default {
  getAllDoctors,
};