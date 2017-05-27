const express = require('express');
const multer = require('multer');
const fs = require('fs');
var path = require('path');

var serveIndex = require('serve-index');
const hbs = require('hbs');

var upload = multer({ dest: '/public/uploads/'});
var app = express();

app.set('view engine', 'hbs');


// setup static file server for public dir
app.use(express.static(__dirname + '/public'));

//logger middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(` TIME: ${now} ~ METHOD | ${req.method}, URL | ${req.url}`);
    next();    
});

// /uploads/ route
app.post('/uploads/', upload.any(), function (req, res, next) {
    
    //set the file
    console.log(req.files, 'files');
    console.log(req.files[0].originalname, 'file name')
    var fileName = req.files[0].originalname;
    var fileSize = req.files[0].size;
    var tempPath = req.files[0].path;
    var uploadPath = __dirname + '/public/uploads/' + fileName;

    //saving the file
    console.log(`SERVER LOG ~ file: ${fileName} size: ${fileSize} `);
    console.log(`SERVER LOG ~ uploading file to : ${uploadPath}`);
    
    //Move the file
    fs.rename(tempPath, uploadPath, (err) => {
        if (err) {
            console.log('POST ERROR || ' + err);
        }
    });
    
    return res.status(200).send('success');
    
});

// /uploads/3D/  route
app.post('/uploads/3D/', upload.any(), function (req, res, next) {
    
    //set the file
    console.log(req.files, 'files');
    console.log(req.files[0].originalname, 'file name')
    var fileName = req.files[0].originalname;
    var fileSize = req.files[0].size;
    var tempPath = req.files[0].path;
    var uploadPath = __dirname + '/public/uploads/3D/' + fileName;

    //saving the file
    console.log(`SERVER LOG ~ file: ${fileName} size: ${fileSize} `);
    console.log(`SERVER LOG ~ uploading file to : ${uploadPath}`);
    
    //Move the file
    fs.rename(tempPath, uploadPath, (err) => {
        if (err) {
            console.log('POST ERROR || ' + err);
        }
    });
    
    return res.status(200).send('success');
    
});

// serves-index file stucture SHOULD BE AT THE BOTTOM
app.use('/uploads', serveIndex(
    
    'public/uploads', 
    {'icons': true,
    'template': 'views/template.hbs',
    'display mode': 'details',
    'stylesheet': 'css/style.css',
    'view': 'details'

    }
    
    ));


//route for uploading files ONLY SINGLE FILES WORKS 
app.post('/', upload.any(), function (req, res, next) {
    
    //set the file
    console.log(req.files, 'files');
    console.log(req.files[0].originalname, 'file name')
    var fileName = req.files[0].originalname;
    var fileSize = req.files[0].size;
    var tempPath = req.files[0].path;
    var uploadPath = __dirname + '/public/uploads/' + fileName;

    //saving the file
    console.log(`SERVER LOG ~ file: ${fileName} size: ${fileSize} `);
    console.log(`SERVER LOG ~ uploading file to : ${uploadPath}`);
    
    //Move the file
    fs.rename(tempPath, uploadPath, (err) => {
        if (err) {
            console.log('POST ERROR || ' + err);
        }
    });
    
    return res.status(200).send('success');
    
});




app.listen(3000, () => {
    console.log('Server is up on port 3000') // second argument of app.listen
});

