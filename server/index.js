require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./controllers/authController');

const PORT = 4000;

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('db connected');
})

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
}));

//Create db connection



app.post('/auth/register', authCtrl.register);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}.`))

