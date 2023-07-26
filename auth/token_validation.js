const { verify } = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');
        if(token) {
            token = token.slice(7);
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if(err){
                    res.json({
                        success: 0,
                        message: 'Invalid token'
                    });
                } else {
                    next();
                }
            })
        } else {
            res.json({
                success: 0,
                message: 'Access denied! unauthorised user'
            })
        }
    }
}