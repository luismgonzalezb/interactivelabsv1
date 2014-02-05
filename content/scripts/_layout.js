function menuUp() {
	hideControls();
	$("#main-container").screenContent().Up({
		swapClass: "container-us",
		next: "/us",
		pattern: getRandomPattern(),
		onComplete: function (argument) {
			$("#video-container").html('<iframe id="us-video" width="640" height="390" src="//www.youtube.com/embed/udgY9n2QnyY" frameborder="0" allowfullscreen></iframe>');
			var usVideo = $("#us-video"),
				fluidContainer = $("body"),
				aspect = usVideo.height() / usVideo.width(),
				originalWidth = usVideo.width();
			$(window).resize(function() {
				var newWidth = fluidContainer.width();
				if (newWidth < originalWidth) {
					usVideo.width(newWidth).height(newWidth * aspect);
				}
			}).resize();
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
		onComplete: WorkInit
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

function WorkInit() {
	$(".project-wrapper").on( "click", function() {
		var currentDiv = $(this);
		currentDiv.addClass("opened");
		currentDiv.off('click');
		dust.render('project', projects[0], function(err, out) {
			currentDiv.html(out);
			var mySwipe = Swipe(document.getElementById('slider'));
		});
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