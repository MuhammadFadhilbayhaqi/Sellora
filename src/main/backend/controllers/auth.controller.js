
const { ipcMain } = require('electron');
const authService = require('../services/auth.service');

function registerAuthHandlers() {
    ipcMain.handle('auth:login', async (_, { username, password }) => {
        try {
            const result = await authService.login(username, password);
            return result; // contains { success: true, user: ... }
        } catch (error) {
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('auth:register', async (_, userData) => {
        try {
            const result = await authService.register(userData);
            return result;
        } catch (error) {
            return { success: false, error: error.message };
        }
    });
}

module.exports = {
    registerAuthHandlers
};
