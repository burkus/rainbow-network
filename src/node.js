// Node Class
import Global from './global.js';

const createRandomVelocity = ({ maxX, maxY, minX, minY }) => {
  let w = window.width;
  let h = window.height;
  let x = Math.random() * w;
  x = map(x, 0, w, minX, maxX);
  let y = Math.random() * h;
  y = map(y, 0, h, minY, maxY);
  return window.createVector(x, y);
};

const findCoord = () => {
  const [r1, r2, r3] = [noise(window.random(0,100)),
    noise(window.random(0,100)), noise(window.random(0,100))];
  let x = window.noise(r1, r2) * window.width;
  let y = window.noise(r2, r3) * window.height;
  return window.createVector(x, y);
}

/*
* index relates to the node's position in the adjacency list
*/
export default class Node {
  constructor(x, y, width, index) {
    this.position = window.createVector(x, y);
    this.width = width;
    this.index = index;
    this.neighbors = [];
    this.color = Global.types.new('color', 255);
    this.velocity = createRandomVelocity({
      minX: -0.7,
      minY: -0.7,
      maxX: 1.5,
      maxY: 1.3
    });
  }

  update() {
    this.position.add(this.velocity);
    if(this.offScreen()) {
      this.velocity = createRandomVelocity({
        minX: -0.7,
        minY: -0.7,
        maxX: 1.5,
        maxY: 1.3
      });
      this.moveTo(findCoord());
    }
    // let r = map(this.position.y, 0, window.height, 0, 255);
    // Set Color Based on Coords
    // Thanks to @PaintingInAir
    let c = {};
    let center = window.createVector(window.width / 2, window.height / 2);
    let d = center.dist(this.position);
    let r = map(d, 0, 1000, 0, 255);

    let b = map(this.position.x, 0, window.width, 0, 255);
    let g = map(this.position.y, 0, window.height, 0, 255);
    this.color.red = r;
    this.color.blue = b;
    this.color.green = g;
  }

  render() {
    let x = this.position.x;
    let y = this.position.y
    window.push();
    window.stroke(...Object.values(this.color));
    window.point(x, y);
    window.rect(x, y, this.width, this.width);
    window.pop();
  }

  offScreen() {
    let { x, y } = this.position;
    return (
      x < 0 || x > window.width ||
      y < 0 || y > window.height
    );
  }

  moveTo(v) {
    this.position = v;
  }
}
