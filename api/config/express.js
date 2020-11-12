const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , path = require('path')
    , cors = require('cors')
    , db = require('./database')
    , multer = require('multer')
    , uuidv4 = require('uuid/v4')
    , fs = require('fs')
    , { commentRoutes, photoRoutes, userRoutes } = require('../app/routes');

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
    fs.mkdirSync(uploadDir + '/imgs');
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/imgs')
    },
    filename: function (req, file, cb) {
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        console.log("Receiving image file")
        cb(null, true)
    }
});

app.set('secret', 'your secret phrase here');
app.set('upload', upload);

const corsOptions = {
    exposedHeaders: ['x-access-token']
};

app.use(express.static('uploads'));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use((req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log('####################################');
    if(token) {
        console.log('A token is send by the application');
        console.log('Token value is ' + token);
    } else {
        console.log('No token is send by the the application');
    }
    console.log('####################################');
    next();
});

userRoutes(app);
photoRoutes(app);
commentRoutes(app);


app.use('*', (req, res) => {
    res.status(404).json({ message: `route ${req.originalUrl} does not exists!` });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;