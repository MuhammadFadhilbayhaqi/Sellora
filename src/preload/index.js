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
  },
  master: {
    // Categories
    getCategories: () => ipcRenderer.invoke('master:category:getAll'),
    getCategoryById: (id) => ipcRenderer.invoke('master:category:getById', id),
    createCategory: (data) => ipcRenderer.invoke('master:category:create', data),
    updateCategory: (data) => ipcRenderer.invoke('master:category:update', data),
    deleteCategory: (id) => ipcRenderer.invoke('master:category:delete', id),

    // Units
    getUnits: () => ipcRenderer.invoke('master:unit:getAll'),
    getUnitById: (id) => ipcRenderer.invoke('master:unit:getById', id),
    createUnit: (data) => ipcRenderer.invoke('master:unit:create', data),
    updateUnit: (data) => ipcRenderer.invoke('master:unit:update', data),
    deleteUnit: (id) => ipcRenderer.invoke('master:unit:delete', id),

    // Products
    getProducts: () => ipcRenderer.invoke('master:product:getAll'),
    getProductById: (id) => ipcRenderer.invoke('master:product:getById', id),
    createProduct: (data) => ipcRenderer.invoke('master:product:create', data),
    updateProduct: (data) => ipcRenderer.invoke('master:product:update', data),
    deleteProduct: (id) => ipcRenderer.invoke('master:product:delete', id),

    // Customers
    getCustomers: () => ipcRenderer.invoke('master:customer:getAll'),
    getCustomerById: (id) => ipcRenderer.invoke('master:customer:getById', id),
    createCustomer: (data) => ipcRenderer.invoke('master:customer:create', data),
    updateCustomer: (data) => ipcRenderer.invoke('master:customer:update', data),
    deleteCustomer: (id) => ipcRenderer.invoke('master:customer:delete', id),

    // Suppliers
    getSuppliers: () => ipcRenderer.invoke('master:supplier:getAll'),
    getSupplierById: (id) => ipcRenderer.invoke('master:supplier:getById', id),
    createSupplier: (data) => ipcRenderer.invoke('master:supplier:create', data),
    updateSupplier: (data) => ipcRenderer.invoke('master:supplier:update', data),
    deleteSupplier: (id) => ipcRenderer.invoke('master:supplier:delete', id),
  }
});

