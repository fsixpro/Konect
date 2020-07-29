const express = require('express');
const dotenv = require('dotenv').config({ path: './config/config.env' });
const db = require('./config/db');

//init db
db();
//import route files
const auth = require('./routes/api/auth.js');
const post = require('./routes/api/post');
const app = express();
//init body-parser middleware
app.use(express.json());
//mount routers
app.use('/api/auth', auth);
app.use('/api/post', post);

const port = process.env.PORT;
app.listen(port, () => console.log(`server running on port ${port}`));
