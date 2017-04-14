//handles allocation pages

var db = require("./database.js");

// function displayAllocations(req, res, next) {
// 	var userId = req.params.userId;
// 	var threshold = req.query.threshold;
// 	//var q = "SELECT * FROM Allocations WHERE userId = " + userId;
// 	var sql = "SELECT * FROM Allocations WHERE userId=$1;";

// 	if (threshold) {	
// 		var thint = threshold * 1;
// 		if (thint >= 0 && thint <= 99) {
// 			sql += " AND stocks > " + thint;
// 		}
// 	}
   
// 	db.query(sql, [userId], function(e1, d1) { 
// 		displayAllocations1(req, res, next, e1, d1); 
// 	});
// }


function displayAllocations(req, res, next) {
	var userId = req.params.userId;
	var threshold = req.query.threshold;
	//var q = "SELECT * FROM Allocations WHERE userId = " + userId;
	var sql = "SELECT * FROM Allocations WHERE userId=$1;";

	if (threshold) {	
		var thint = threshold * 1;
		if (thint >= 0 && thint <= 99) {
			var sql = "SELECT * FROM Allocations WHERE userId=$1 AND stocks > $2;";
			db.query(sql, [userId, thint], function(e1, d1) { 
				displayAllocations1(req, res, next, e1, d1); 
			});
		} else {
			var sql = "SELECT * FROM Allocations WHERE userId=$1;";
			db.query(sql, [userId], function(e1, d1) { 
				displayAllocations1(req, res, next, e1, d1); 
			});
		}
	}
   	
   	else {
		var sql = "SELECT * FROM Allocations WHERE userId=$1;";
		db.query(sql, [userId], function(e1, d1) { 
			displayAllocations1(req, res, next, e1, d1); 
		});
	}
}


function displayAllocations1(req, res, next, err, data) {
	if (err) return next(err);
	var doc = data.rows[0];
	return res.render("allocations", doc);
}


exports.displayAllocations = displayAllocations;

