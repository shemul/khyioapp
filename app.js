var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express')
var app = express();
var http = require('http');

var normalizePort = function(val) {
	var port;
	port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};

var port = normalizePort(process.env.PORT || '8080');
var ip = process.env.IP

var httpServer = http.createServer(app);

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


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
			res.send(notFound);
		}


	});

	db.close();

})
httpServer.listen(port, function() {
	console.log("Http Service is running on port " + port);
});
