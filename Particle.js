function Particle() {
  this.position = createVector(random(width), random(height));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.maxSpeed = 10;
  this.colorCount = 0;

  this.previousPosition = this.position.copy();

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
    this.position.add(this.velocity);
  }

  this.follow = function(vectors) {
    var x = floor(this.position.x / gridScale);
    var y = floor(this.position.y / gridScale);
    var index = x + y * columns;
    var force = vectors[index];
    if (force != null) {
      this.applyForce(force);
    }
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.show = function() {
    stroke(this.colorCount, 255, 255, 255);
    this.colorCount += 1;
    if (this.colorCount > 360) {
      this.colorCount = 0;
    }
    strokeWeight(1);
    line(this.position.x, this.position.y, this.previousPosition.x, this.previousPosition.y);
    this.updatePreviousPostion();
  }

  this.edges = function() {
    if (this.position.x > width) {
      this.position.x = 0;
      this.updatePreviousPostion();
    }
    if (this.position.x < 0) {
      this.position.x = width;
      this.updatePreviousPostion();
    }
    if (this.position.y > height) {
      this.position.y = 0;
      this.updatePreviousPostion();
    }
    if (this.position.y < 0) {
      this.position.y = height;
      this.updatePreviousPostion();
    }
  }

  this.updatePreviousPostion = function() {
    this.previousPosition.x = this.position.x;
    this.previousPosition.y = this.position.y;
  }
}
