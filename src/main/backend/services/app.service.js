const appRepository = require('../repositories/app.repository');

function getAppVersion(app) {
  const version = appRepository.getAppVersionFromSystem(app);

  // simpan ke SQLite
  appRepository.saveAppVersion(version);

  return version;
}

function getSavedVersion() {
  return appRepository.getSavedAppVersion();
}

module.exports = {
  getAppVersion,
  getSavedVersion,
};
