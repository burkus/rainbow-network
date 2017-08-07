// Edge Class
import Global from './global.js';

export default class Edge {
  constructor(from, to, weight, color) {
    this.from = from;
    this.to = to;
    this.weight = weight;
    this.color = color
  }

  render() {
    let fx = this.from.position.x;
    let fy = this.from.position.y;
    let tx = this.to.position.x;
    let ty = this.to.position.y;
    window.push();
    window.stroke(...Object.values(this.color));
    window.noFill();
    window.line(fx, fy, tx, ty);
    window.ellipse(fx, fy, 20, 20);
    window.ellipse(tx, ty, 20, 20);
    window.pop();
  }
}
