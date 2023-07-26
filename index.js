const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./api/users/user.router');

dotenv.config({ path: './.env'});

app.use(express.json());

app.use('/api/users', userRouter);

app.listen(process.env.APP_PORT,()=>{
    console.log('Server up and running on port: ',process.env.APP_PORT);
})