import practiceApiModel from "../models/practiceApiModel.js";

async function getAllPracticeApis(apiId, filters) {
  return await practiceApiModel.getAll(apiId, filters);
}

async function getPracticeApiById(apiId, id) {
  return await practiceApiModel.getById(apiId, id);
}

export default {
  getAllPracticeApis,
  getPracticeApiById,
};
