const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    try {
        // Check if refreshToken exists in the database
        const foundUser = await User.findOne({ where: { refreshToken } });
        if (!foundUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None'  });  //secure: true
            return res.sendStatus(204);
        }

        // Delete refreshToken in the database
        // foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
        await foundUser.update({ refreshToken: null });

        // Clear refreshToken cookie
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None'  });  //secure: true
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

module.exports = { handleLogout };