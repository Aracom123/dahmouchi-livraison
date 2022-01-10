const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./dist/tikena'));

// var corsOptions = {
//     origin: 'http://localhost:9191',
//     optionsSuccessStatus: 200,
// }
// app.use(cors(corsOptions));

app.listen(8082);
console.log("App listening on port 8082");