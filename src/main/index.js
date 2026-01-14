const { app, BrowserWindow } = require('electron');
const path = require('path');

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
    mainWindow.webContents.openDevTools(); // Buka inspect element otomatis
  } else {
    // Mode Production: Load file hasil build React
    mainWindow.loadFile(path.join(__dirname, '../renderer/dist/index.html'));
  }
}

app.whenReady().then(() => {
  // registerRoutes(); // Akan kita aktifkan nanti
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});