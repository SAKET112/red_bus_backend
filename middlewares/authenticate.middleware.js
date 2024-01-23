const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        const decoded = jwt.verify(token, process.env.SECRET_CODE)
        if(decoded) {
            const userID = decoded.userID
            req.body.userID = userID
            next();
        } else {
            res.send("Please Login First")
        }
    } else {
        res.status(400).json({message :"unSuccessFull"})
    }
};


module.exports = {
    authenticate
}