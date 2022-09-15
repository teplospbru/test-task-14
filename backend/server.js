require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const app = express();

const port = 3001;

app.use(cors());

app.get('/api/rows', (req, res) => {
    pool.query('SELECT * FROM ' + process.env.DB_NAME, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            res.json(data.rows);
        };
    });
})

app.listen(port, () => console.log('Server is running on http://localhost:' + port));