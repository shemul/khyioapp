var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express')
var app = express();
var fs = require('fs');

var http = require('http');
var https = require('https');
var port = {
	'http': 8080,
	'https': 5556
};

//var privateKey  = fs.readFileSync('/home/theshemul/ssl.key', 'utf8');
//var certificate = fs.readFileSync('/home/theshemul/ssl.cert', 'utf8');
//var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);
//var mongoose = require('mongoose');


app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/*=============================================
=            		Database	               =
=============================================*/

//mongoose.connect('mongodb://localhost/khyio');
//var Schema = mongoose.Schema;

// create a schema
// var userSchema = new Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   created_at: Date,
//   updated_at: Date
// });

// on every save, add the date
// userSchema.pre('save', function(next) {
//   // get the current date
//   var currentDate = new Date();

//   // change the updated_at field to current date
//   this.updated_at = currentDate;

//   // if created_at doesn't exist, add to that field
//   if (!this.created_at)
//     this.created_at = currentDate;

//   next();
// });

//var User = mongoose.model('aiub', userSchema);

/*=====  End of the Database  ======*/

app.get('/dict/:word', function(req, res) {

	var db = new sqlite3.Database('dict.db');

	db.get("SELECT * FROM english where word=?", (req.params.word).toUpperCase(), function(errs, rows) {
		if (rows) {
			let eng_id = rows.serial;
			db.get("SELECT * FROM bengali where serial= ?", eng_id, function(err, row) {
				if (!err) {
					res.send(row);
				}
				else {
					res.send("Not Found");
				}
			});

		}
		else {
			var notFound = {
				found: false,
				status: "Not Found"
			}

			//fs.appendFile("top_list.txt", req.params.word + '\r\n', function(err) {
			//}); 

			res.send(notFound);
		}


	});

	db.close();

})



// app.post('/stat', function(req, res) {
//     var user = req.body.user;
//     var pass = req.body.pass

//     var client = new User({
//       username: user,
//       password: pass 
//     });

//     client.save(function(err) {
//       if (err) {
//       	console.log(err);
//       } else {
// 		console.log('User saved successfully!');
// 		res.send("Success");
//       }
//     });

// });

httpServer.listen(port.http, function() {
	console.log("Http Service is running on port " + port.http);
});

// httpsServer.listen(port.https, function() {
//  	console.log("Https Service is running on port " + port.https);
// });
