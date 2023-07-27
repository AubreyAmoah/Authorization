const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./api/users/user.router');
const refreshRouter = require('./auth/refresh.router');
const logoutRouter = require('./auth/logout.router');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');

dotenv.config({ path: './.env'});

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false}));

app.use(express.json());

app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

app.listen(process.env.APP_PORT,()=>{
    console.log('Server up and running on port: ',process.env.APP_PORT);
})