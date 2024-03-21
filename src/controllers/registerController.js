// Import necessary modules
const  User  = require('../model/User'); // Assuming you have a Sequelize model named User
const bcrypt = require('bcrypt');

// Define the handler function for creating a new user
const handleNewUser = async (req, res) => {
    // Extract user information from the request body
    const {usertype, username,  password, accesslevel } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        // Check if the username already exists in the database
        const duplicate = await User.findOne({ where: { username } });
        if (duplicate) {
            return res.sendStatus(409); // Conflict
        }

        // Encrypt the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in the database
        await User.create({
            usertype,
            username,
            password: hashedPassword,
            accesslevel,
        });

        res.status(201).json({ success: `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };
