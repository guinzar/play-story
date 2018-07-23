const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
// const options = {
//   key: fs.readFileSync('../privatekey.pem'),
//   cert: fs.readFileSync('../server.crt')
// };

mongoose.connect('mongodb://localhost:27017/playstory');

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app).listen(port, () => {
  console.log(`Server listening on ${port}`);
});
// const server = https.createServer(options, app).listen(port, () => {
//   console.log(options);
//   console.log(`Server listening on ${port}`);
// });
