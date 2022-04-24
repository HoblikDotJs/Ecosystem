let creatures = [];
let food = [];
const populationSize = 10;
const initialFood = 50;
const mutationDiff = 0.1;
const poisonPercent = 15;
const agentLifeSpan = 1000;
const agentLifeTick = 0.05;
let foodPercent = 2;
let slider;
let time = 0;
let sec = 0;
let hrs = 0;
let mins = 0;
let colorOffset;

function timeTick() {
  hrs = nf(floor(floor(time / 60) / 60), 2, 0);
  mins = nf(floor(time / 60) % 60, 2, 0);
  sec = nf(time % 60, 2, 0)
  setTimeout(() => {
    timeTick();
  }, 1000);
  time++;
}

function setup() {
  colorMode(HSB, 100, 150, 100, 255);
  timeTick();
  createCanvas(windowWidth, windowHeight);
  slider = createSlider(0, 10, 2);
  slider.position(15, 115);
  setEnvironment();
}

function draw() {
  background(0, 100, 4);
  foodPercent = slider.value();
  if (random() > 1 - foodPercent / 100) {
    food.push(new Food(random(width), random(height)));
  }
  if (creatures.length == 0) {
    setEnvironment();
  }
  let sum = 0;
  for (let c of creatures) {
    sum += c.life;
    c.show();
    c.update();
    c.collide(food);
  }
  for (let f of food) {
    f.show();
  }
  stroke(255, 150);
  fill(255, 150);
  textSize(20);
  text(creatures.length + " alive", 15, 25);
  text(food.length + " food", 15, 85);
  text(`${hrs}:${mins}:${sec}`, 15, 45);
  let netPerc = floor(((sum / 1000) / creatures.length) * 100);
  text("net " + netPerc + "%", 15, 65);
  text(foodPercent, 155, 132);
  fill(60, 150, 100, 220);
  stroke(60, 150, 100, 220);
  text("Refresh", 15, 105);
  for (let i = creatures.length - 1; i >= 0; i--) {
    if (creatures[i].life >= 1200) {
      creatures[i].life = 1000;
      creatures.push(creatures[i].breed());
    }
    if (creatures[i].life <= 0) creatures.splice(i, 1);
  }
}

function mousePressed() {
  if (mouseX < 105 && mouseY > 88 && mouseY < 110) {
    setEnvironment();
  } else if (mouseX > 205 || mouseY > 155) {
    food.push(new Food(mouseX, mouseY));
  }
}

function setEnvironment() {
  colorOffset = random(100);
  food = [];
  time = 0;
  creatures = [];
  for (let i = 0; i < populationSize; i++) {
    creatures.push(new Creature(random(width), random(height), {
      col: color((colorOffset + ((100 * i) / populationSize)) % 100, 100, 100),
      r: 25 + 4 * i,
    }));
  }
  for (let i = 0; i < initialFood; i++) {
    food.push(new Food(random(width), random(height)));
  }
}