function menuUp() {
	hideControls();
	$("#main-container").screenContent().Up({
		swapClass: "container-home",
		next: "/us",
		pattern: getRandomPattern(),
		onComplete: function (argument) {
		}
	});
}

function menuDown() {
	hideControls();
	$("#main-container").screenContent().Down({
		swapClass: "container-contact",
		next: "/contact",
		pattern: getRandomPattern(),
		onComplete: function (argument) {
			$("#question-wrapper").load("contact/question");
		}
	});
}

function menuLeft() {
	hideControls();
	$("#main-container").screenContent().Left({
		swapClass: "container-work",
		next: "/work",
		pattern: getRandomPattern(),
		onComplete: function (argument) {
		}
	});
}

function menuRight() {
	hideControls();
	$("#main-container").screenContent().Right({
		swapClass: "container-team",
		next: "/team",
		pattern: getRandomPattern(),
		onComplete: TeamInit
	});
}

function TeamInit() {
	$(".member-wrapper").click(function (e) {
		var elem = e.currentTarget;
		var divId = elem.id;
		if (elem.className.indexOf(" selected") === -1) {
			elem.className += " selected";
			$(".member-wrapper:not(#" + divId + ")").addClass("unselected");
		} else {
			elem.className = elem.className.replace("selected", "");
			$(".member-wrapper:not(#" + divId + ")").removeClass("unselected");
		}
	});
	showControls();
}

function getRandomPattern() {
	var n = Math.floor((Math.random() * (patternList.length - 1)) + 1);
	return patternList[n];
}

function hideControls() {
	$(".down, .up, .left, .right").hide();
}

function showControls() {
	$(".down, .up, .left, .right").show();
}