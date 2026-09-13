import fakeApiServices from "../services/fakeApiServices.js";

async function getAllFakeApis(req, res) {
  try {
    const apis = await fakeApiServices.getAllFakeApis();
    res.status(200).json(apis);
  } catch (error) {
    console.error("Error fetching fake APIs:", error);
    res.status(500).json({
      message: "Failed to fetch fake APIs",
      error: error.message,
    });
  }
}

async function getFakeApiById(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const api = await fakeApiServices.getFakeApiById(Number(id));

    if (!api) {
      return res.status(404).json({ message: "API not found" });
    }

    res.status(200).json(api);
  } catch (error) {
    console.error("Error fetching fake API by ID:", error);
    res.status(500).json({
      message: "Failed to fetch API details",
      error: error.message,
    });
  }
}

export default {
  getAllFakeApis,
  getFakeApiById,
};

