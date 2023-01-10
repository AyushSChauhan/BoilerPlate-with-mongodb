const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const dotenv = require('dotenv');

app.use(bodyParser.json({ limit: "50mb" })); 
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); 
app.set('views', path.join(__dirname,'app/views'));
app.set('view engine', 'ejs');
app.use(express.static("public/assets/uploads"));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

dotenv.config();
app.use('/',require('./app/routes/route'));
app.use('/',require('./app/routes/catagory'));
app.use('/',require('./app/routes/contact'));
app.use('/',require('./app/routes/tastimonial'));
app.use('/',require('./app/routes/portfolio'));

const port = process.env.PORT || 3001;
app.listen(port, () => console.info(`Listening on port ${port}...`));