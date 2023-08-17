import express from 'express';
import bodyParser from 'body-parser';
import { generateToken } from './_util';

const app = express();
const port = 3000;
const jsonParser = bodyParser.json();

const users = new Map();
users.set('test', '123456');

const loggedInUsers = new Map();
function makeToken(username: string) {
    let token = generateToken();
    while (loggedInUsers.has(token)) {
        token = generateToken();
    }

    setTimeout(() =>{
        loggedInUsers.delete(token);
    }, 10800);

    loggedInUsers.set(token, username);
    return token;
}

app.post('/auth/login', jsonParser, (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    if (username && password && users.get(username) === password) {
        const token = makeToken(username);
        console.log('made token', token, loggedInUsers.get(token));
        res.send(token);
    } else {
        res.sendStatus(403);
    }

});

// app.post('/auth/register', jsonParser, (req, res) => {
//     console.log(req.body);
//     const username = req.body.username;
//     const password = req.body.password;
//     const password2 = req.body.password2;

//     if (isRegisterValid(username, password, password2) && !users.has(username)) {
//         registerUser(username, password);
//         res.send
//     } else {
//         res.sendStatus(403);
//     }

// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});