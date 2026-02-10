const appService = require('../services/app.service');

async function getAppVersion(app) {
  try {
    const version = appService.getAppVersion(app);
    return {
      success: true,
      data: version,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

async function getSavedVersion() {
  try {
    return {
      success: true,
      data: appService.getSavedVersion(),
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

module.exports = {
  getAppVersion,
  getSavedVersion,
};
