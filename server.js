let express = require('express');
let bodyParser = require('body-parser').json;
let app = express();
let port = 3000;

let token = '';

app.use(express.static('public'));
app.use(bodyParser());

app.get('/products', (req, res) => {
    if (req.headers['x-authorization'] != token) {
        res.status(403);
        return res.json('Invalid token');
    }

    res.json([
        'Product A',
        'Product B',
        'Product C',
        'Product D',
    ]);
});

app.post('/login', (req, res) => {
    if (req.body.username == 'peter' && req.body.password == '123') {
        token = 'xxxxxxxx-xxxxxxxx'.replace(/x/g, x => (Math.random() * 16 | 0).toString(16));
        res.json({ token });
    } else {
        res.status(403);
        res.json({ message: 'Incorrect username or password' });
    }
});

app.listen(port, () => console.log(`Express running on port: ${port}...`));