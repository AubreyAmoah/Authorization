const { compareRefreshToken, deleteRefreshToken } = require('../api/users/user.service');

module.exports = {
    handleLogout: (req, res) => {
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.sendStatus(401);
        console.log(cookies.jwt);
        const refreshToken = cookies.jwt;

        compareRefreshToken (refreshToken, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                res.clearCookie('jwt', { httpOnly: true , sameSite:'None', secure: true });
                return res.json({
                    success: 0,
                    data: 'Token not found'
                });
            }

            //Delete refreshToken
            deleteRefreshToken(refreshToken, (err, results) => {
                if (err) {
                    console.log(err);
                }
   
                //Delete refreshToken
                res.clearCookie('jwt', { httpOnly: true , sameSite:'None', secure: true}); // secure: true on production
                return res.json({
                    success: 1,
                    data: 'Logout succesful'
                });
            })
        })
    }
}