require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.PASSWORD,
    database: "testtask14"
});

const app = express();

const port = 3001;

app.use(cors());

app.get('/api/rows', (req, res) => {
    pool.query('SELECT * FROM testtask14', (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            res.json(data.rows);
        };
    });
})

app.listen(port, () => console.log('Server is running on http://localhost:' + port));