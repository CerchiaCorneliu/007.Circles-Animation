var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "blue";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "red";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "green";
// c.fillRect(300, 300, 100, 100);
// console.log(canvas);

// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

/* for(var i = 0; i < 100; i++) {
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	c.beginPath();
	c.arc(x, y, 30, 0, Math.PI * 2, false);
	c.strokeStyle = "blue";
	c.stroke();
} */


function rendercanvas(){
	maxRadius = document.getElementById("maxRadius").value;
	var mouse = {
		x: undefined,
		y: undefined
	}

	var colorArray = [
		"#2E4B51",
		"#B7D5BB",
		"#E5D5A4",
		"#BAA876",
		"#4E362A",
	];

	window.addEventListener("mousemove", 
		function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
	});

	window.addEventListener("mouseout", 
		function(event) {
		mouse.x -= 2 * event.x;
		mouse.y -= 2 * event.y;	
	});

	window.addEventListener("resize", function(){
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		init();
	});

	function Circle(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.minRadius = radius;
		this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

		this.draw = function() {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
		}

		this.update = function() {
			if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			  	this.dx = -this.dx;
			}

			if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
				this.dy = -this.dy;
			}

			this.x += this.dx;
			this.y += this.dy;

			// interactivity
			if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
				if (this.radius < maxRadius) {
					this.radius += 1;
				}			
			} else if (this.radius > this.minRadius){
				this.radius -= 1;
			}

			this.draw();
		}
	}

	var circleArray = [];
	cellsNumber = document.getElementById("cellsNumber").value;

	function init() {
		circleArray = [];
		for (var i = 0; i < cellsNumber; i++) {
			var radius = Math.random() * 3 + 1;
			var x = Math.random() * (innerWidth - radius * 2) + radius;
			var y = Math.random() * (innerHeight - radius * 2) + radius;
			var dx = (Math.random() - 0.5);
			var dy = (Math.random() - 0.5);
			circleArray.push(new Circle(x, y, dx, dy, radius));
		}
	}

	function animate() {
		requestAnimationFrame(animate);
		c.clearRect(0, 0, innerWidth, innerHeight);
		for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
		}
	}

	init();
	animate();

}

window.onload = function(){
	maxRadiusfill = document.getElementById("maxRadius");
	if (!maxRadiusfill.value) {
		maxRadiusfill.value = 20;
	}
	cellsNumberfill = document.getElementById("cellsNumber");
	if (!cellsNumberfill.value) {
		cellsNumberfill.value = 500;
	}
	rendercanvas();	
	document.getElementById("applySettings").onclick = function(){
	rendercanvas();
	return false;
	};
}

