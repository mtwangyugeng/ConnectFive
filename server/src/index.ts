import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const jsonParser = bodyParser.json();

const users = new Map();
users.set('test', '123456');

app.post('/auth/login', jsonParser, (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    if (username && password && users.get(username) === password) {
        res.send('good');
    } else {
        res.sendStatus(403);
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});