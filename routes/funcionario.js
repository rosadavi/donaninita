const router = express.Router();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

const asyncHandler = require('express-async-handler');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));



module.exports = router;