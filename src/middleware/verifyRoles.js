const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.role || !allowedRoles.includes(req.role)) {
            return res.sendStatus(401);
        }
        next();
    }
}

module.exports = verifyRoles;
