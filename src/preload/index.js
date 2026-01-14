const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Disini nanti kita taruh fungsi: createTransaction, getProducts, dll
  getAppVersion: () => process.versions.electron,
});