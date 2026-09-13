import fakeApiModel from "../models/fakeApiModel.js";

async function getAllFakeApis() {
  return fakeApiModel.getAllFakeApis();
}

async function getFakeApiById(id) {
  return fakeApiModel.getFakeApiById(id);
}

export default {
  getAllFakeApis,
  getFakeApiById,
};

