require('dotenv').config();

const { app, BrowserWindow } = require('electron'); // ipcMain sudah tidak perlu di-import di sini
const path = require('path');
const syncWorker = require('./backend/workers/sync.worker');

// Import semua controller
const authController = require('./backend/controllers/auth.controller');
const masterController = require('./backend/controllers/master.controller');
const appController = require('./backend/controllers/app.controller');

console.log('[DEBUG] syncWorker =', syncWorker);

// Register IPC Handlers secara modular
authController.registerAuthHandlers();
masterController.registerMasterHandlers();
appController.registerAppHandlers();

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

app.whenReady().then(() => {
  createWindow();
  syncWorker.startSyncWorker();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});