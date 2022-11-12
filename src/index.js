const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const app = express();

path = require('path');

dotenv.config({ path: './.env' });

const PORT = process.env.APP_DOCKER_PORT || 3000;

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
});

app.set('view engine', 'hbs');

app.listen(PORT, () => {
    console.log(`Server started on port ${process.env.APP_LOCAL_PORT}`);
});