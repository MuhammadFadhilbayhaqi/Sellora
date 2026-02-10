const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getAppVersion: () => ipcRenderer.invoke('app:get-version'),
  ping: () => 'pong',
  getSavedVersion: () => ipcRenderer.invoke('app:get-saved-version'),
  createTransaction: (payload) => ipcRenderer.invoke('transaction:create', payload),
  listTransactions: (limit) => ipcRenderer.invoke('transaction:list', limit),
  auth: {
    login: (credentials) => ipcRenderer.invoke('auth:login', credentials),
    register: (userData) => ipcRenderer.invoke('auth:register', userData),
  }
});

