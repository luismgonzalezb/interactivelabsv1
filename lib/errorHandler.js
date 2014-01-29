
var errorHandler = {};

errorHandler.BadResponse = function (err, req, res) {
	console.log(err);
	var mesasge = err.message || "System Error";
	res.status(500).json({ success: false, mesasge: mesasge });
};

module.exports = errorHandler