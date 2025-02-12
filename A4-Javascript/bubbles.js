let bubbles = [];
let tickSpawnAmount = 2;
let tickTime = 4;
let currTicks = 0;
let targetBubbleColor = [255, 255, 255];
let bubbleColor = [255, 255, 255];

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.id('canvasJS');
    rectMode(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    noStroke();
    targetBubbleColor = [170, 170, 255];
}

function draw() {
    background(67, 87, 171);
    drawBubbles();
}

function drawBubbles() {
    currTicks += 1;
    if (currTicks >= tickTime) {
      for (let i = 0; i < tickSpawnAmount; i++) {
        bubbles.push(new BubbleParticle());
      }
      currTicks = 0;
    }
  
    for (let i = 0; i < bubbles.length; i++) {
      let bubble = bubbles[i];
      bubble.display();
      bubble.move();

      if (bubble.alphaCol <= 1) {
        bubble.alive = false;
      }
    }

    let bubblesCopy = [...bubbles];
    for (let i = 0; i < bubblesCopy.length; i++) {
      let bubble = bubblesCopy[i];
      if (bubble.alive == false) {
        bubblesCopy.splice(i, 1);
      }
    }
    bubbles = bubblesCopy;
  
    for (let i = 0; i < targetBubbleColor.length; i++) {
      let diff = targetBubbleColor[i] - bubbleColor[i];
      bubbleColor[i] = bubbleColor[i] + (diff*0.015);
    }
  }

  class BubbleParticle {
    constructor() {
      this.pos = createVector(random(width), height+10);
      this.vel = createVector(random(-2, 2), random(-3, -6));
      this.alphaCol = 255;
      this.alive = true;
    }

    display() {
      fill(bubbleColor[0], bubbleColor[1], bubbleColor[2], this.alphaCol);
      ellipse(this.pos.x, this.pos.y, 20, 20);
    }
  
    move() {
      this.pos.add(this.vel);
      // Fade out the alpha over time
      this.alphaCol *= 0.98;
    }
  }
