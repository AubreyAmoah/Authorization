const { create, getUserByUserId, getUsers, updateUser, deleteUser, getUserByUserEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync} = require('bcrypt');
const { sign } = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'});

module.exports = {
    createUser : (req, res) => {
        const body = req.body;
        console.log(body.password)
        const salt = genSaltSync(10); // Generate salt
        body.password = hashSync(body.password, salt); //hash the password

        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getUserById : (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getUser: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        })
    },
    updateUsers: (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Failed to update user'
                });
            }
            return res.json({
                success: 1,
                message: 'updated succesfully'
            });
        });
    },
    deleteUsers: (req, res) => {
        const data = req.body;
        getUserByUserId(data.id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }

            deleteUser(data, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }  
                return res.json({
                    success: 1,
                    message: 'user deleted succesfully'
                });
            });
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: 'Invalid email or password'
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results}, process.env.SECRET_KEY,{
                    expiresIn: '1h'
                });
                return res.json({
                    success: 1,
                    message: 'login successfully',
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: 'Invalid email or password'
                });
            }
        });
    }

}