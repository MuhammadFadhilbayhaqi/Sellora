const { ipcMain } = require('electron');
const categoryRepo = require('../repositories/category.repository');
const unitRepo = require('../repositories/unit.repository');
const productRepo = require('../repositories/product.repository');
const customerRepo = require('../repositories/customer.repository');
const supplierRepo = require('../repositories/supplier.repository');

// Helper function untuk standarisasi response dan error handling
const handleRequest = async (actionFn) => {
    try {
        const data = await actionFn();
        return { success: true, data };
    } catch (error) {
        console.error('[Master IPC Error]:', error);
        return { success: false, error: error.message };
    }
};

function registerMasterHandlers() {
    // Categories
    ipcMain.handle('master:category:getAll', () => handleRequest(() => categoryRepo.getAll()));
    ipcMain.handle('master:category:getById', (_, id) => handleRequest(() => categoryRepo.getById(id)));
    ipcMain.handle('master:category:create', (_, data) => handleRequest(() => categoryRepo.create(data)));
    ipcMain.handle('master:category:update', (_, { id, ...data }) => handleRequest(() => categoryRepo.update(id, data)));
    ipcMain.handle('master:category:delete', (_, id) => handleRequest(() => categoryRepo.remove(id)));

    // Units
    ipcMain.handle('master:unit:getAll', () => handleRequest(() => unitRepo.getAll()));
    ipcMain.handle('master:unit:getById', (_, id) => handleRequest(() => unitRepo.getById(id)));
    ipcMain.handle('master:unit:create', (_, data) => handleRequest(() => unitRepo.create(data)));
    ipcMain.handle('master:unit:update', (_, { id, ...data }) => handleRequest(() => unitRepo.update(id, data)));
    ipcMain.handle('master:unit:delete', (_, id) => handleRequest(() => unitRepo.remove(id)));

    // Products
    ipcMain.handle('master:product:getAll', () => handleRequest(() => productRepo.getAll()));
    ipcMain.handle('master:product:getById', (_, id) => handleRequest(() => productRepo.getById(id)));
    ipcMain.handle('master:product:create', (_, data) => handleRequest(() => productRepo.create(data)));
    ipcMain.handle('master:product:update', (_, { id, ...data }) => handleRequest(() => productRepo.update(id, data)));
    ipcMain.handle('master:product:delete', (_, id) => handleRequest(() => productRepo.remove(id)));

    // Customers
    ipcMain.handle('master:customer:getAll', () => handleRequest(() => customerRepo.getAll()));
    ipcMain.handle('master:customer:getById', (_, id) => handleRequest(() => customerRepo.getById(id)));
    ipcMain.handle('master:customer:create', (_, data) => handleRequest(() => customerRepo.create(data)));
    ipcMain.handle('master:customer:update', (_, { id, ...data }) => handleRequest(() => customerRepo.update(id, data)));
    ipcMain.handle('master:customer:delete', (_, id) => handleRequest(() => customerRepo.remove(id)));

    // Suppliers
    ipcMain.handle('master:supplier:getAll', () => handleRequest(() => supplierRepo.getAll()));
    ipcMain.handle('master:supplier:getById', (_, id) => handleRequest(() => supplierRepo.getById(id)));
    ipcMain.handle('master:supplier:create', (_, data) => handleRequest(() => supplierRepo.create(data)));
    ipcMain.handle('master:supplier:update', (_, { id, ...data }) => handleRequest(() => supplierRepo.update(id, data)));
    ipcMain.handle('master:supplier:delete', (_, id) => handleRequest(() => supplierRepo.remove(id)));
}

module.exports = { registerMasterHandlers };