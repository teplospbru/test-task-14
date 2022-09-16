require('dotenv').config();
const db = require('./db/pool');
const fs = require('fs');

// наполняем базу данных
const createDB = async () => {
    try {
        const textContent = await fs.readFileSync('./backend/db/text-3.txt', 'utf8');
        const arr = await textContent.split("\n");
        await db.query('DELETE FROM ' + process.env.DB_NAME);
        for(let i = 0; i < arr.length; i++) {
            const date = getRandom(1, 30).toString().padStart(2, '0') + "/" + getRandom(1, 12).toString().padStart(2, '0') + "/22";
            const qty = getRandom(1, 100).toString().padStart(3, '0') * 10;
            const speed = getRandom(1, 12).toString().padStart(2, '0') * 10;
            await db.query(
                'INSERT INTO ' + process.env.DB_NAME + ' (date, name, quantity, distance) values ($1, $2, $3, $4)', 
                [date, arr[i], qty, speed]
            );
        }
        process.exit();
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    };
};

// получаем случайное число в диапазоне
const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

createDB();