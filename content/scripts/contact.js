function sendResponse(frm) {
	var badOptions = { text: "", type: "error", layout: "bottom", timeout: 1500 };
	var goodOptions = { text: "", type: "success", layout: "bottom", timeout: 1500 };
	if ($("input[type=radio]:checked").length > 0) {
		var data = $(frm).serialize();
		$.post(frm.action, data, function (e) {
			console.log(e);
		}).fail(function (e) {
			badOptions.text = "There was an issue with the server please try again latter";
			var n = noty(badOptions);
		});
	} else {
		badOptions.text = "You need to select at least one answer";
		var n = noty(badOptions);
	}
}