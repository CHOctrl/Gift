let font;
let particles = [];
let words = ["พี่ว่าน", "Love You", "Cute", "<3"]; // Custom text
let wordIndex = 0;
let fontSize;

function preload() {
  // Load the new Thai-supported font
  font = loadFont('assets/Mali-Medium.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Use HSB for vibrant colors
  colorMode(HSB, 360, 100, 100, 100);
  fontSize = min(width, height) / 5;
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);

  // Initialize with the first word
  generateParticles(words[wordIndex]);
}

function draw() {
  // Minimal Pink Background (very light pink/white with alpha for trails)
  background(340, 5, 100, 20); //

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.behaviors();
    p.update();
    p.show();
  }
}

function mousePressed() {
  wordIndex = (wordIndex + 1) % words.length;
  generateParticles(words[wordIndex]);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fontSize = min(width, height) / 5;
  generateParticles(words[wordIndex]);
}

function generateParticles(txt) {
  particles = [];

  // Calculate bounding box to center text
  let bounds = font.textBounds(txt, 0, 0, fontSize);
  let xStart = width / 2 - bounds.w / 2;
  let yStart = height / 2 + bounds.h / 2;

  let points = font.textToPoints(txt, xStart, yStart, fontSize, {
    sampleFactor: 0.3, // Higher = more points (adjust for density)
    simplifyThreshold: 0
  });

  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let particle = new Particle(pt.x, pt.y);
    particles.push(particle);
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 3; // Smaller, more minimal points
    this.maxSpeed = 8;
    this.maxForce = 0.8;

    // Minimal Pink Palette
    // Focus on hues around 330-350 (Rose/Pink) with varied saturation
    this.hue = random(320, 350);
    this.sat = random(40, 80); // Softer colors
    this.bright = random(90, 100); // Bright/Pastel
  }

  behaviors() {
    let arrive = this.arrive(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse);

    // Subtle noise for minimal, gentle movement
    let n = noise(this.pos.x * 0.005, this.pos.y * 0.005, frameCount * 0.005);
    let noiseForce = p5.Vector.fromAngle(n * TWO_PI).mult(0.05);

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
    this.applyForce(noiseForce);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    stroke(this.hue, this.sat, this.bright);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    let speed = this.maxSpeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  flee(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    if (d < 50) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
}
