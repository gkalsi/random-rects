var G = 0.5
var MIN_HEIGHT = 10;
var MIN_WIDTH  = 10;

var Colours = ["#CC0000", "#FCE94F", "#FCAF3E", "#8AE234", "#729FCF", "#AD7FA8"];

function Rect(top, left, bottom, right) {
	this.top 	= top;
	this.left 	= left;
	this.bottom = bottom;
	this.right 	= right;
}

var generateRects = function(top, left, bottom, right, p, d) {
	
	var height = bottom - top;
	var width  = right - left;

	if (Math.random() < 0.01 || height < MIN_HEIGHT || width < MIN_WIDTH) {
		return [];
	} else if (Math.random() > p) {
		var w = width *  ((Math.random() % 0.2) + 0.8);
		var h = height * ((Math.random() % 0.2) + 0.8);
		var x = (width - w);
		var y = (height - h);

		var r = new Rect(Math.floor(top + y), Math.floor(left + x), Math.floor(top + h), Math.floor(left + w));

		return [r];
	}
	
	var dmP = (1 - d);
	var dmX = dmP * width;
	var dmY = dmP * height;
	var horizontalCut 	= Math.random() * (height - 2 * dmY) + top;
	var verticalCut 	= Math.random() * (width  - 2 * dmX) + left;

	var q = [];
	if (width > height) {
		q.push(generateRects(top, left, bottom, verticalCut, p * G, d));
		q.push(generateRects(top, verticalCut, bottom, right, p * G, d));
	} else {
		q.push(generateRects(top, left, horizontalCut, right, p * G, d));
		q.push(generateRects(horizontalCut, left, bottom, right	, p * G, d));
	}

	
	
	

	var result = [];
	for (i = 0; i < 4; i++) {
		result.push.apply(result,q[i]);
	}

	return result;
}

var renderRects = function(rects, ctx) {
	for (i = 0; i < rects.length; i++) {
		ctx.fillStyle = Colours[Math.floor(Math.random() * Colours.length)];
		ctx.fillRect(rects[i].left, rects[i].top, rects[i].right - rects[i].left, rects[i].bottom - rects[i].top);
	}
}

var rects = generateRects(0, 0, 600, 800, 2.0, 0.95);
var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
console.log(rects);
renderRects(rects, ctx);