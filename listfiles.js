var recursive = require('recursive-readdir');

recursive('uploads', function (err, files) {
    if (err) {
        console.log(err);
    }

    console.log(files)
})