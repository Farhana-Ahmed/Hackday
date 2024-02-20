const axios = require("axios");

const fetchRecipes = async (options) => {
  try {
    const response = await axios.request(options);
    return response;
  } catch (err) {
    throw err;
  }
};

module.exports = { fetchRecipes };
