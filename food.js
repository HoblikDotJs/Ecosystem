class Food {
    constructor(x, y) {
        this.poisoned = false;
        if (random() > 1 - poisonPercent / 100) this.poisoned = true;
        if (x < 205 && y < 155) {
            x = random(205, width);
            y = random(155, height)
        };
        this.pos = createVector(x, y);
        this.r = 5;
    }
    show() {
        noFill();
        if (this.poisoned) {
            stroke(0, 100, 100, 120);
        } else {
            stroke(30, 25, 100, 150);
        }
        rect(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}