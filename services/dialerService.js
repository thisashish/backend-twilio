const axios = require('axios');

exports.createCampaign = async (campaignData) => {
  try {
    const response = await axios.post('https://dialer-api.example.com/campaigns', campaignData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to create campaign');
  }
};
