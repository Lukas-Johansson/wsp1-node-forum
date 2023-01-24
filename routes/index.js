const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
    res.send('Hello you!')
});

const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
const promisePool = pool.promise();

router.post('/new', async function (req, res, next) {
    const { author, title, content } = req.body;
    const [rows] = await promisePool.query("INSERT INTO lj04forum (authorId, title, content) VALUES (?, ?, ?)", [author, title, content]);
    res.redirect('/');
});

router.get('/new', async function (req, res, next) {
    res.render('new.njk', {
        title: 'Nytt inlägg',
    });
});

router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM lj04forum");
    res.json({ rows });
    res.render('index.njk', {
        rows: rows,
        title: 'Forum',
    });;    
});

router.get('/new', async function (req, res, next) {
    const [users] = await promisePool.query("SELECT * FROM lj04forum");
    res.render('new.njk', {
        title: 'Nytt inlägg',
        users,
    });
});

module.exports = router;