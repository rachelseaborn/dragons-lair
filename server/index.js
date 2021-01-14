require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./controllers/authController');

// authCtrl = require('./authController'),

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

//Set up session as TLM

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}));

//Create db connection

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('db connected');
})

// app.post('/auth/register', authCtrl.register);

const PORT = 4000;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}.`))

