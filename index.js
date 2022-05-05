const express = require('express');
const app = express();
const db = require('./config/db');

require('dotenv').config();
app.use(express.json());

db.authenticate().then(() => {
    db.sync({force: true});
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.use("/member", require('./routes/memberRoute'));
app.use("/post", require('./routes/postRoute'));

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});