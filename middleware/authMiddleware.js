const jwt = require('jsonwebtoken');
const checkFunction = require('../helpers/checkFunction');

exports.Authentication = (role = 'both', tokenLocation = 'header') => {
    return (req, res, next) => {
        console.log('Hooppp');

        const token = tokenLocation === 'url' ? req.params.token : req.header('token');

        checkFunction(res, !token, 'No Token', 401);

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ errors: [{ mesage: 'Invalid token' }] })
            }
            else {
                if (role === decodedToken.role || role === 'both') {
                    req.decodedData = decodedToken;
                    next();
                } else {
                    res.status(401).json({ errors: [{ message: 'Unautorized access' }] })
                }
            }
        });
    }
}
