require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const indexRouter = require('./routes/index');

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


