let creatures = [];
let food = [];
let data = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 30; i++) {
    creatures.push(new Creature(random(width), random(height), random(10, 40), color(random(255), random(255), random(255))));
  }
  for (let i = 0; i < 44; i++) {
    food.push(new Food(random(width), random(height)));
  }
}

function draw() {
  background(0);
  if (random() > 0.92) {
    food.push(new Food(random(width), random(height)));
  }
  let sum = 0;
  for (let c of creatures) {
    sum += c.life;
    c.show();
    c.update();
    c.collide(food);
  }
  stroke(255, 150);
  fill(255, 150);
  textSize(20);
  text(creatures.length + " alive", 15, 25);
  text(food.length + " food", 15, 85);
  text(sum + " net", 15, 45);
  let netPerc = floor(((sum / 1000) / creatures.length) * 100);
  text(netPerc + "%", 15, 65);
  for (let i = creatures.length - 1; i >= 0; i--) {
    if (creatures[i].life >= 1200) {
      creatures[i].life = 1000;
      creatures.push(new Creature(creatures[i].pos.x, creatures[i].pos.y, creatures[i].r, creatures[i].col))
    }
    if (creatures[i].life <= 0) creatures.splice(i, 1);
  }
  for (let f of food) {
    f.show();
  }
  if (frameCount % 60 == 0) {
    data.push({
      "population": creatures.length,
      "net": sum / 1000,
      "net %": netPerc,
      "food": food.length,
    });
  } else if (frameCount % 50000 == 0) {
    saveJSON(data, "populationData");
  }
}