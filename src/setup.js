import config from '../canvas.config.js';
import Global from './global.js';
import { createSetup } from './utils.js';
import Graph from './graph.js';
import Node from './node.js';

Global.types.add('color', {
  red: 0,
  green: 0,
  blue: 0
});

const nodeWidth = 55;

const nodeCollection = (n) => {
  let nodes = [];
  for(let i = 0; i < n; i++) {
    let x = Math.random() * window.width;
    x = window.map(x, 0, window.width, 100, window.width - 50);
    let y = Math.random() * window.height;
    y = window.map(y, 0, window.height, 75, window.height - 75);
    let node = new Node(x, y, nodeWidth, i);
    nodes.push(node);
  }
  return nodes;
}

const setup = createSetup(({ width, height }) => {
  let canvas = window.createCanvas(width(), height());
  window.rectMode(CENTER);
  window.noFill();
  window.stroke(0);
  Global.canvas = canvas;
  // Population
  Global.state.graph = new Graph(nodeCollection(55));
  Global.state.graph.addRandomNeighbors(1);
}, config);

export { setup };
