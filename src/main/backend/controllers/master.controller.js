
const { ipcMain } = require('electron');
const categoryRepo = require('../repositories/category.repository');
const unitRepo = require('../repositories/unit.repository');
const productRepo = require('../repositories/product.repository');
const customerRepo = require('../repositories/customer.repository');
const supplierRepo = require('../repositories/supplier.repository');

function registerMasterHandlers() {
    // Categories
    ipcMain.handle('master:category:getAll', () => { console.log('IPC: category:getAll'); return categoryRepo.getAll(); });
    ipcMain.handle('master:category:getById', (_, id) => categoryRepo.getById(id));
    ipcMain.handle('master:category:create', (_, data) => { console.log('IPC: category:create', data); return categoryRepo.create(data); });
    ipcMain.handle('master:category:update', (_, { id, ...data }) => categoryRepo.update(id, data));
    ipcMain.handle('master:category:delete', (_, id) => categoryRepo.remove(id));

    // Units
    ipcMain.handle('master:unit:getAll', () => unitRepo.getAll());
    ipcMain.handle('master:unit:getById', (_, id) => unitRepo.getById(id));
    ipcMain.handle('master:unit:create', (_, data) => unitRepo.create(data));
    ipcMain.handle('master:unit:update', (_, { id, ...data }) => unitRepo.update(id, data));
    ipcMain.handle('master:unit:delete', (_, id) => unitRepo.remove(id));

    // Products
    ipcMain.handle('master:product:getAll', () => { console.log('IPC: product:getAll'); return productRepo.getAll(); });
    ipcMain.handle('master:product:getById', (_, id) => productRepo.getById(id));
    ipcMain.handle('master:product:create', (_, data) => { console.log('IPC: product:create', data); return productRepo.create(data); });
    ipcMain.handle('master:product:update', (_, { id, ...data }) => productRepo.update(id, data));
    ipcMain.handle('master:product:delete', (_, id) => productRepo.remove(id));

    // Customers
    ipcMain.handle('master:customer:getAll', () => customerRepo.getAll());
    ipcMain.handle('master:customer:getById', (_, id) => customerRepo.getById(id));
    ipcMain.handle('master:customer:create', (_, data) => customerRepo.create(data));
    ipcMain.handle('master:customer:update', (_, { id, ...data }) => customerRepo.update(id, data));
    ipcMain.handle('master:customer:delete', (_, id) => customerRepo.remove(id));

    // Suppliers
    ipcMain.handle('master:supplier:getAll', () => supplierRepo.getAll());
    ipcMain.handle('master:supplier:getById', (_, id) => supplierRepo.getById(id));
    ipcMain.handle('master:supplier:create', (_, data) => supplierRepo.create(data));
    ipcMain.handle('master:supplier:update', (_, { id, ...data }) => supplierRepo.update(id, data));
    ipcMain.handle('master:supplier:delete', (_, id) => supplierRepo.remove(id));
}

module.exports = { registerMasterHandlers };
