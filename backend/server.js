require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db/pool');
const app = express();
const port = 3001;

app.use(cors());

app.get('/api/rows', (req, res) => {
    db.query('SELECT * FROM ' + process.env.DB_NAME, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            res.json(data.rows);
        };
    });
})

app.listen(port, () => console.log('Server is running on http://localhost:' + port));