
var jsonResponseHandler = {};

function BadResponse(err, req, res) {
	console.log(err);
	var mesasge = err.message || "System Error";
	res.status(500).json({ success: false, mesasge: mesasge });
};

function Json_Response(err, req, res) {
	if (err) { BadResponse(err, req, res); }
	res.status(200).json({ success: true });
};

jsonResponseHandler = {
	BadResponse: BadResponse,
	Json_Response: Json_Response
}

module.exports = jsonResponseHandler