class Creature {
  constructor(x, y, obj) {
    this.col = obj.col;
    this.r = obj.r;
    this.mutationRate = random(1 - mutationDiff, 1 + mutationDiff);
    this.life = agentLifeSpan;
    this.seedX = random(0, 1000);
    this.seedY = random(0, 1000);
    this.pos = createVector(x, y);
    this.vel = createVector(noise(this.seedX) - 0.5, noise(this.seedY) - 0.5);
    this.vel.setMag(30 / this.r);
  }

  collide(list) {
    for (let i = list.length - 1; i >= 0; i--) {
      if (dist(this.pos.x, this.pos.y, list[i].pos.x, list[i].pos.y) < this.r) {
        this.life += 250;
        if (list[i].poisoned) {
          this.life -= 750;
        }
        food.splice(i, 1);
      }
    }
  }
  breed() {
    let genes = {
      r: this.r * this.mutationRate,
      col: color((this.col._getHue() * this.mutationRate) % 360, 100, 100),
    }
    return new Creature(this.pos.x, this.pos.y, genes);
  }
  update() {
    this.vel = createVector(noise(this.seedX) - 0.5, noise(this.seedY) - 0.5);
    this.vel.setMag(30 / this.r);
    if (random() < agentLifeTick) {
      this.life--;
    }
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
    let newC = color(this.col._getHue(), 100, 100, map(this.life, 0, 1000, 25, 120));
    stroke(newC);
    strokeWeight(6);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
    strokeWeight(2);
  }
}

