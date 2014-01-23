$.fn.screenContent = function() {
	this._options = {
		swapContainer: "#swap-container",
		speed: 1000,
	};
	this.Up = function (options) {
		this.Move(options, "up", "100%", "top");
	};
	this.Down = function(options) {
		this.Move(options, "down", "-100%", "top");
	};
	this.Left = function (options) {
		this.Move(options, "left", "100%", "left");
	};
	this.Right = function (options) {
		this.Move(options, "right", "-100%", "left");
	};
	this.Move = function(options, direccion, value, cssProp) {
		options = this.jsonConcat(options, this._options);
		var currentObject = this;
		currentObject.initializeContainers(currentObject[0].id, options.swapContainer, direccion, options.pattern);
		$(options.swapContainer).load(options.next, function () {
			var anim = {};
			anim[cssProp] = value;
			$(currentObject[0]).animate(anim, options.speed);
			$(options.swapContainer).addClass(options.swapClass);
			anim[cssProp] = 0;
			$(options.swapContainer).animate(anim, options.speed, function () {
				currentObject.swapContainers(currentObject[0].id, options.swapContainer);
				options.onComplete();
			});
		});
	};
	this.initializeContainers = function (mainCont, swapCont, direction, pattern) {
		var swapContainer = document.getElementById(swapCont.substring(1));
		swapContainer.style.backgroundImage = "url('/content/images/patterns/" + pattern + "')";
		swapContainer.style.left = 0;
		swapContainer.style.top = 0;
		if (direction == "up") swapContainer.style.top = "-100%";
		if (direction == "down") swapContainer.style.top = "100%";
		if (direction == "left") swapContainer.style.left = "-100%";
		if (direction == "right") swapContainer.style.left = "100%";
	};
	this.swapContainers = function(mainCont, swapCont) {
		var mainContainer = document.getElementById(mainCont);
		var swapContainer = document.getElementById(swapCont.substring(1));
		mainContainer.innerHTML = swapContainer.innerHTML;
		mainContainer.className = swapContainer.className;
		mainContainer.style.backgroundImage = swapContainer.style.backgroundImage;
		mainContainer.style.top = 0;
		mainContainer.style.left = 0;
		swapContainer.innerHTML = "";
		swapContainer.className = "container";
		swapContainer.style.top = "100%";
		swapContainer.style.left = "100%";
	};
	this.jsonConcat = function(o1, o2) {
		for (var key2 in o2) {
			o1[key2] = o2[key2];
		}
		return o1;
	};
	return this;
};