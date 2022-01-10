function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const express = require('express');
const app = express();

// const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(requireHTTPS);
app.use(express.static('./dist/ara-livraison'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/ara-livraison/'});
});

// var corsOptions = {
//     origin: 'http://localhost:9191',
//     optionsSuccessStatus: 200,
// }
// app.use(cors(corsOptions));

app.listen(process.env.PORT || 8080);
console.log("App listening on port 8082");