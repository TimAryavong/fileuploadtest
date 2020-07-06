'use strict';
var express = require('express');
var router = express.Router();

/* install these npms and require them */
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

/* POST for handling file uploads */
router.post('/upload', function (req, res) {
   // get incoming form
  var form = new formidable.IncomingForm(); 
  form.uploadDir = path.join(__dirname, '../public/images'); 
  // parse the form into json
  form.parse(req, function (err, fields, files) {
    // Update the filename
    files.upload.name = fields.title + '.' + files.upload.name.split('.')[1]; 
    // Upload the file to our server
    fs.rename(files.upload.path, path.join(form.uploadDir, files.upload.name), function (err) {
      if (err) console.log(err);
      else console.log("Successful upload");
      return res.render('index', { "image": "/images/" + files.upload.name });
    });
  });
  form.on('end', function (err) {
    //res.send({ "success":"Your files has been successfully uploaded"});
    if (err) console.log(err);
  });
});
module.exports = router;
