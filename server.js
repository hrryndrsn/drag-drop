const express = require('express');
const multer = require('multer');
const fs = require('fs');
var path = require('path');

var upload = multer({ dest: 'uploads/'});
var app = express();

var dirContents = [];

// setup static file server
app.use(express.static(__dirname + '/public'));

//logger middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`);
    next();    
});

//uploads router
app.post('/', upload.any(), function (req, res, next) {
    
    console.log(req.files, 'files');
    console.log(req.files[0].originalname, 'file name')
    var fileName = req.files[0].originalname;
    var tempPath = req.files[0].path;
    var uploadPath = __dirname + '/uploads/' + fileName;

    //saving the file
    console.log(`temp file path is: ${tempPath}`);
    console.log(`uploading file to : ${uploadPath}`)
    
    fs.rename(tempPath, uploadPath, (err) => {
        if (err) {
            console.log(err);
        }
        //push notes onto an array here

    });

    return res.status(200).send('success');
    
});


app.listen(3000, () => {
    console.log('Server is up on port 3000') // second argument of app.listen
});

