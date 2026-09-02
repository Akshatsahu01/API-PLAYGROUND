import doctorServices from "../services/doctorServices.js";

async function getAllDoctors(req, res) {
  try {
    const doctors = await doctorServices.getAllDoctors(req.query);

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
}

export default {
  getAllDoctors,
};