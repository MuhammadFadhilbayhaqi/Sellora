const db = require('../database/sqlite');

function getAppVersionFromSystem(app) {
  return app.getVersion();
}

function saveAppVersion(version) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO app_info (key, value)
    VALUES ('version', ?)
  `);
  stmt.run(version);
}

function getSavedAppVersion() {
  const row = db
    .prepare(`SELECT value FROM app_info WHERE key = 'version'`)
    .get();

  return row ? row.value : null;
}

module.exports = {
  getAppVersionFromSystem,
  saveAppVersion,
  getSavedAppVersion,
};
