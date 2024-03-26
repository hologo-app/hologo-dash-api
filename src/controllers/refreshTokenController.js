const User = require('../model/User');
const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None',secure: true }); // secure: true

    try {
        const foundUser = await User.findOne({ where: { refreshToken } });

        // Detected refresh token reuse!
        if (!foundUser) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            // Delete refresh tokens of hacked user
            const hackedUser = await User.findOne({ where: { username: decoded.username } });
            hackedUser.refreshToken = "";
            await hackedUser.save();
            return res.sendStatus(403); // Forbidden
        }

        let newRefreshTokenString = foundUser.refreshToken;

        // Evaluate jwt 
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                // Expired refresh token
                foundUser.refreshToken = newRefreshTokenString;
                await foundUser.save();
            }
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

            // Refresh token was still valid
            const role = foundUser.usertype;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "role": role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' },
            
            );

            const newRefreshToken = jwt.sign({ "username": foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            // Saving refreshToken with current user
            newRefreshTokenString = newRefreshToken

            await foundUser.update({ refreshToken: newRefreshTokenString });
            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true,  sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 ,secure: true}); // secure: true,

            res.json({ accessToken });
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports = { handleRefreshToken };