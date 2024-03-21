const  User  = require('./../model/User'); // Assuming you have a model named User defined in '../models'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const cookies = req.cookies;

    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    try {
        const foundUser = await User.findOne({ where: { username: user } });
        if (!foundUser) return res.sendStatus(401); // Unauthorized

        // Evaluate password
        const match = await bcrypt.compare(pwd, foundUser.password);
        if (match) {
            const role = foundUser.usertype;

            // Create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            const newRefreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '15s' }
            );

            // Remove existing refresh token if any
            let newRefreshTokenArray = foundUser.refreshToken || [];
            if (cookies?.jwt) {
                // Check if refresh token exists in database
                const foundToken = await User.findOne({ where: { refreshToken: cookies.jwt } });

                // Detected refresh token reuse!
                if (!foundToken) {
                    // Clear out ALL previous refresh tokens
                    newRefreshTokenArray = [];
                }

                // Clear existing cookie
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            }

            // Save new refresh token with current user
            newRefreshTokenArray.push(newRefreshToken);
            await foundUser.update({ refreshtoken: newRefreshTokenArray });

            // Create Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            // Send authorization roles and access token to user
            res.json({ accessToken });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { handleLogin };
