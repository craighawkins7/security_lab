//handle memos pages
var db = require("./database.js");

//handle adding a memo
function addMemos(req, res, next) {
	var memo = req.body.memo;
	var sql = "INSERT INTO Memos(memo) VALUES($1);";
	//var sql = "INSERT INTO Memos(memo) VALUES ( '" + memo + "' )";
	db.query(sql, [memo], function(e1, d1) { 
		addMemos1(req, res, next, e1, d1); 
	});	
}


function addMemos1(req, res, next, err, data) {
	if (err) return next(err);
	else displayMemos(req, res, next);
}

//handle displaying memos
function displayMemos(req, res, next) {
	var sql = "SELECT * FROM Memos ORDER BY memotime DESC";
	db.query(sql, function (e1, d1) { 
		displayMemos1(req, res, next, e1, d1); 
	});
}

function displayMemos1(req, res, next, err, data) {
    if (err) next(err);
    else {
    	var doc = { memosList: data.rows, userId: req.session.userId };
    	return res.render("memos", doc);
    }
}

exports.addMemos = addMemos;
exports.displayMemos = displayMemos;

