
const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');

const SALT_ROUNDS = 10;

async function register(userData) {
    const { username, password, fullName, role } = userData;

    // Check if user exists
    const existingUser = userRepository.findUserByUsername(username);
    if (existingUser) {
        throw new Error('Username already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const newUser = userRepository.createUser({
        username,
        password: hashedPassword,
        fullName,
        role
    });

    return {
        success: true,
        user: {
            id: newUser.id,
            username: newUser.username,
            role: newUser.role,
            fullName: newUser.fullName
        }
    };
}

async function login(username, password) {
    const user = userRepository.findUserByUsername(username);

    if (!user) {
        throw new Error('Invalid username or password');
    }

    if (user.status !== 'active') {
        throw new Error('Account is inactive');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Invalid username or password');
    }

    return {
        success: true,
        user: {
            id: user.user_id,
            username: user.username,
            role: user.role,
            fullName: user.full_name
        }
    };
}

module.exports = {
    register,
    login
};
