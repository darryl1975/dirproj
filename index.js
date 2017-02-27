// accessing directories and files
var fs = require('fs');
var path = "./images";
var imgURL = [];

// web server framework
var express = require('express');
var app = express();
var path2 = require('path');

// handling uploading of files
var multer	=	require('multer');
var upload = multer({ dest: 'images/' });
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './images');
  },
  filename: function (req, file, callback) {
      var fname = file.originalname;
    callback(null, fname);
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

function refreshDir() {
    fs.readdir(path, function(err, items) {
        console.log(items);
        imgURL = [];

        for (var i=0; i<items.length; i++) {
            var newURL = "";
            //newURL = "./images/" + items[i];
            newURL = items[i];
            imgURL.push(newURL);
            //console.log(items[i]);
        }

        for (var i=0; i<imgURL.length; i++) {
            console.log(imgURL[i]);
        } 
    });
};

// handling static files: js, css, images
app.use(express.static('images'))

// express simple routing
app.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    refreshDir();
    res.render('index.ejs', { imglist : imgURL});
});

app.get('/upload',function(req,res){
      res.sendFile(__dirname + "/upload.html");
});

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

// web server hosted and accessible via http://localhost:1337
app.listen(1337);


//branch01
// to be seen in branch01 first