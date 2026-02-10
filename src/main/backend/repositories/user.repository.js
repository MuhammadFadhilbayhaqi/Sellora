
const db = require('../database/sqlite');
const { v4: uuidv4 } = require('uuid');

function createUser(user) {
    const { username, password, role, fullName } = user;
    const id = uuidv4();
    const createdAt = Date.now();

    const stmt = db.prepare(`
    INSERT INTO users (user_id, username, password, role, full_name, status, created_at)
    VALUES (?, ?, ?, ?, ?, 'active', ?)
  `);

    try {
        stmt.run(id, username, password, role || 'admin', fullName, createdAt);
        return { id, username, role, fullName, createdAt };
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            throw new Error('Username already exists');
        }
        throw err;
    }
}

function findUserByUsername(username) {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    return stmt.get(username);
}

function findUserById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE user_id = ?');
    return stmt.get(id);
}

module.exports = {
    createUser,
    findUserByUsername,
    findUserById
};
