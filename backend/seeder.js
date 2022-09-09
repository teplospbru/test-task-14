require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.PASSWORD,
    database: "testtask14"
});

const createDB = async () => {
    try {
        const textContent = await fs.readFileSync('./backend/text-2.txt', 'utf8');
        const arr = await textContent.split("\n");
        await pool.query('DELETE FROM testtask14');
        for(let i = 0; i < arr.length; i++) {
            const date = getRandom(1, 30).toString().padStart(2, '0') + "/" + getRandom(1, 12).toString().padStart(2, '0') + "/22";
            const qty = getRandom(1, 100).toString().padStart(3, '0') * 10;
            const speed = getRandom(1, 12).toString().padStart(2, '0') * 10;
            await pool.query(
                'INSERT INTO testtask14 (date, name, quantity, distance) values ($1, $2, $3, $4)', 
                [date, arr[i], qty, speed]
            );
        }
        process.exit();
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    };
};

createDB();

// получаем случайное число в диапазоне
const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};