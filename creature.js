class Creature {
  constructor(x, y, r, col) {
    this.col = col;
    this.life = 1000;
    this.seedX = random(0, 1000);
    this.seedY = random(0, 1000);
    this.pos = createVector(x, y);
    this.vel = createVector(noise(this.seedX) - 0.5, noise(this.seedY) - 0.5);
    this.r = r;
    this.vel.setMag(30 / this.r);
  }
  collide(list) {
    for (let i = list.length - 1; i >= 0; i--) {
      if (dist(this.pos.x, this.pos.y, list[i].pos.x, list[i].pos.y) < this.r) {
        this.life += 250;
        if (list[i].poisoned) {
          this.life = 1;
        }
        food.splice(i, 1);
      }
    }
  }
  update() {
    this.vel = createVector(noise(this.seedX) - 0.5, noise(this.seedY) - 0.5);
    this.vel.setMag(30 / this.r);
    this.life--;
    this.pos.add(this.vel);
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
    this.seedX += 0.01;
    this.seedY += 0.01;
  }
  show() {
    noFill();
    stroke(this.col.levels[0], this.col.levels[1], this.col.levels[2], map(this.life, 0, 1500, 0, 255));
    strokeWeight(6);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    strokeWeight(2);
  }
}


class Food {
  constructor(x, y) {
    this.poisoned = false;
    if (random() > 0.92) this.poisoned = true;
    this.pos = createVector(x, y);
    this.r = 5;
  }
  show() {
    noFill();
    if (this.poisoned) {
      stroke(255, 20, 20);
    } else {
      stroke(255);
    }
    rect(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}