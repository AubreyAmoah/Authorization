const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { compareRefreshToken } = require('../api/users/user.service');

dotenv.config({ path: './.env'});

module.exports = {
    handleRefreshToken: (req, res) => {
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.sendStatus(401);
        console.log(cookies.jwt);
        const refreshToken = cookies.jwt;

        compareRefreshToken (refreshToken, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: 'Token not found'
                });
            }

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err ||  results.email !== decoded.email) return res.sendStatus(401);
                const accessToken = jwt.sign(
                     { 'email': decoded.email },
                     process.env.ACCESS_TOKEN_SECRET,
                     {expiresIn: '1hr'}
                );
                res.json({ accessToken });
            })
        })
    }
}