
const jwt = require("jsonwebtoken");

const requireAuthentication = async (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        token = token.split(" ")[1];
        if (!token) {
            return res.status(403).json({
                success: false,
                message: "A token is required for authentication",
                error: null,
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        if (!decoded) return res.status(401).json({
            success: false,
            message: "Unauthorized request",
            error: null,
        });

        return next();
        
    } catch (err) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid Token!", error: null });
    }
};

module.exports = requireAuthentication;
