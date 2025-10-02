const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.sendStatus(401); // No token provided
    }

    // FIXED: Standardized to use JWT_SECRET_KEY to match the rest of the app
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token is invalid (expired or tampered)
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };

