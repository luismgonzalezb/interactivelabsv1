var badOptions = { text: "", type: "error", layout: "bottom", timeout: 1500 };
var goodOptions = { text: "", type: "success", layout: "bottom", timeout: 1500 };

function submitFormRender(frm) {
	var data = $(frm).serialize();
	$.post(frm.action, data, function (response) {
		if (response) {
			$("#question-wrapper").html(response);
		}
	}).fail(function (e) {
		badOptions.text = "There was an issue with the server please try again latter";
		var n = noty(badOptions);
	});
}

function sendResponse(frm) {
	if ($("input[type=radio]:checked").length > 0) {
		submitFormRender(frm);
	} else {
		badOptions.text = "You need to select at least one answer";
		var n = noty(badOptions);
	}
}

function register(frm) {
	$(frm).validate({
		submitHandler: function(frm) {
			submitFormRender(frm);
		},
		invalidHandler: function(e, v) {
			badOptions.text = "";
			for (var i = 0; i < v.errorList.length; i++) {
				badOptions.text += v.errorList[i].message + "</br>";
				badOptions.layout = "bottom";
			}
			var n = noty(badOptions);
		},
		errorPlacement: function(error, element) { },
		rules: {
			email: {
				required: true,
				email: true
			},
			fullName: {
				required: true
			}
		},
		messages: {
			email: {
				required: "We need your email address to contact you",
				email: "Your email address must be in the format of name@domain.com"
			},
			fullName: {
				required: "We need to know what to call you by"
			}	
		}
	});
}