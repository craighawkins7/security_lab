//var safeEval = require('safe-eval'); //new craig


//handle contributions
var db = require("./database.js");

//handle display contributions page
function displayContributions(req, res, next) {
	displayContributions0(req, res, next, false);
}

// function displayContributions0(req, res, next, sts) {
// 	var userid = req.session.userId;
// 	var q = "SELECT * FROM Contributions WHERE userId = " + userid;
// 	db.query(q, function (e1, d1) { 
// 		displayContributions1(req, res, next, sts, e1, d1); 
// 	});
// }

function displayContributions0(req, res, next, sts) {
	var userid = req.session.userId;
	//var q = "SELECT * FROM Contributions WHERE userId = " + userid;
	var sql = "SELECT * FROM Contributions WHERE userID=$1;";
	db.query(sql, [userId], function (e1, d1) { 
		displayContributions1(req, res, next, sts, e1, d1); 
	});
}


function displayContributions1(req, res, next, sts, err, data) {
	if (err) return next(err);
	var contrib = data.rows[0];
	if (sts == true) contrib.updateSuccess = true;
	return res.render("contributions", contrib);
}

//handle contributions update page
function handleContributionsUpdate(req, res, next) {
	// convert to numbers
	// var preTax = eval(req.body.preTax);
	// var afterTax = eval(req.body.afterTax);
	// var roth = eval(req.body.roth);

/*
	var preTax = safeEval(req.body.preTax);
	var afterTax = safeEval(req.body.afterTax);
	var roth = safeEval(req.body.roth);
*/

	var preTax = parseInt(req.body.preTax);
	var afterTax = parseInt(req.body.afterTax);
	var roth = parseInt(req.body.roth);




	var userId = req.session.userId;

   	//validate contributions
	if (isNaN(preTax) || isNaN(afterTax) || isNaN(roth) || preTax < 0 || afterTax < 0 || roth < 0) {
      return res.render("contributions", {
			updateError: "Invalid contribution percentages", userId: userId
		});
    }
   	// Prevent more than 30% contributions
	if (preTax + afterTax + roth > 30) {
		return res.render("contributions", {
			updateError: "Contribution percentages cannot exceed 30 %",
				  userId: userId
			 });
	}

	// var q = "UPDATE Contributions SET preTax = " 
	// 		+ preTax + ", afterTax = " + afterTax 
	// 		+ ", roth = " + roth + " WHERE userId = " + userId;
	var sql = "UPDATE Contributions SET preTax=$1, afterTax=$2, roth=$3 WHERE userID=$4;";

	db.query(sql, [preTax, afterTax, roth, userId], function (e1, d1) { 
		handleContributionsUpdate1(req, res, next, e1, d1);
	});
}



function handleContributionsUpdate1(req, res, next, err, data) {
	if (err) {
		return next(err);
	} else {
		return displayContributions0(req, res, next, true);
	}
}

exports.displayContributions = displayContributions;
exports.handleContributionsUpdate = handleContributionsUpdate;

