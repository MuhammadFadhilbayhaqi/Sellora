const { ipcMain, app } = require('electron');
const appService = require('../services/app.service');

async function getAppVersion() {
  try {
    // Kita langsung menggunakan 'app' dari import electron
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

// Fungsi untuk mendaftarkan semua routing IPC terkait App
function registerAppHandlers() {
  ipcMain.handle('app:get-version', () => {
    return getAppVersion();
  });

  ipcMain.handle('app:get-saved-version', () => {
    return getSavedVersion();
  });
}

module.exports = {
  registerAppHandlers,
};