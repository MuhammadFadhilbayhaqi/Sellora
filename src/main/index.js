require('dotenv').config();

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const backend = require('./backend');
const syncWorker = require('./backend/workers/sync.worker');
// Import auth controller
const authController = require('./backend/controllers/auth.controller');

console.log('[DEBUG] syncWorker =', syncWorker);

// Register Auth IPC Handlers
authController.registerAuthHandlers();

// Nanti kita import routes backend di sini
// const registerRoutes = require('./backend/routes');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false, // Wajib false demi keamanan
    },
  });

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // Mode Dev: Load dari Vite Server
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools(); // Buka inspect element otomatis
  } else {
    // Mode Production: Load file hasil build React
    mainWindow.loadFile(path.join(__dirname, '../renderer/dist/index.html'));
  }
}

ipcMain.handle('app:get-version', () => {
  return backend.appController.getAppVersion(app);
});

ipcMain.handle('app:get-saved-version', () => {
  return backend.appController.getSavedVersion();
});

ipcMain.handle('transaction:create', (_, payload) => {
  return backend.transactionController.createTransaction(payload);
});

ipcMain.handle('transaction:list', (_, limit) => {
  return backend.transactionController.listTransactions(limit);
});

app.whenReady().then(() => {
  // registerRoutes(); // Akan kita aktifkan nanti
  createWindow();
  syncWorker.startSyncWorker();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


