var increment = 0.05;
var gridScale = 20;
var columns;
var rows;
var zOffset = 0;
var flowfield;
var windParticles = [];

var vehicles = [];
var cailujian;
var interval = 2;

function preload() {
  cailujian = loadImage('Cailin&Julian.jpg');
  cailujian.loadPixels();
}

function setup() {
  createCanvas(600, 1000);
  background(51);
	pixelDensity(3);
  cailujian.resize(600, 900);
  var points = pointsFromImage(cailujian);

  for (var i = 0; i < points.length; i += 1) {
    vehicles.push(new Vehicle(points[i].x, points[i].y));
  }

	columns = floor(width / gridScale);
  rows = floor(height / gridScale);
  flowfield = new Array(columns * rows);

	for (var i = 0; i < 3; i += 1) {
    windParticles.push(new Particle());
  }
}

function draw() {
  background(0);

	var xOffset = 0;
  for (var x = 0; x < columns; x += 1) {
    var yOffset = 0;
    for (var y = 0; y < rows; y += 1) {
      var index = (x + y * columns);
      var angle = map(noise(xOffset, yOffset, zOffset), 0, 1, 0, TWO_PI * 3);
      var vector = p5.Vector.fromAngle(angle);
      vector.setMag(0.8);
      flowfield[index] = vector;
      yOffset += increment;
    }
    xOffset += increment;
  }
  zOffset += 0.001;
  for (var i = 0; i < windParticles.length; i += 1) {
    windParticles[i].follow(flowfield);
    windParticles[i].update();
    windParticles[i].edges();
  }

  for (var i = 0; i < vehicles.length; i += 1) {
		// Put code here to make the vehicles flee windParticles that follow a vectorfield
		for (var j = 0; j < windParticles.length; j += 1) {
	    //vehicles[i].behaviors(windParticles[j].position);
			vehicles[i].applyForce(vehicles[i].flee(windParticles[j].position).mult(5));
	  }
		vehicles[i].applyForce(vehicles[i].arrive());
    vehicles[i].update();
    vehicles[i].show();
  }
}

function pointsFromImage(image) {
  var points = [];
  image.loadPixels();
  for (var x = 0; x < image.width; x += 3) {
    for (var y = 0; y < image.height; y += 3) {
      var index = (x + y * image.width) * 4;
      if (image.pixels[index] <= interval) {
        points.push(createVector(x, y - 150));
      }
    }
  }
  return points;
}
