// Graph Class
import Edge from './edge.js';

export default class Graph {
  constructor(nodes, edges) {
    this.adjacencyList = [];
    if(nodes) {
      this.nodes = nodes;
      this.update();
    } else {
      this.nodes = [];
    }

    if(edges) {
      this.edges = edges;
    } else {
      this.edges = [];
    }
  }

  // create or update adjacencyList
  update() {
    this.adjacencyList.length = 0;
    for(let i = 0; i < this.nodes.length; i++) {
      let row = this.nodes[i].neighbors;
      this.adjacencyList.push(row);
    }
    // adjacencyList is now up to date
    // create edges
    this.adjacencyList.forEach((row, index) => {
      // row is an array of integers
      // col is one of the neigbors of node[index]
       row.forEach(col => {
        let a = this.nodes[index];
        let b = this.nodes[col];
        let weight = this.getNeighborCount(index);
        this.edges.push(new Edge(a, b, weight, a.color));
      });
    });
  }

  // where n is an integer
  getNeighborCount(n) {
    let count = 0;
    this.adjacencyList.forEach(row => {
      if(row.indexOf(count) !== -1) {
        count += 1;
      }
    });
    return count;
  }

  addRandomNeighbors(n) {
    // lol rip
    for(let i = 0; i < this.nodes.length; i++) {
      let node = this.nodes[i];
      for(let j = 0; j < n; j++) {
        let neighbor = window.floor(Math.random() * this.nodes.length);
        if(i !== neighbor && node.neighbors.indexOf(neighbor) === -1) {
          node.neighbors.push(neighbor);
        }
      }
    }
    this.update();
  }

  render() {
    this.nodes.forEach(n => n.render());
    this.edges.forEach(e => e.render());
    this.nodes.forEach(n => n.update());

  }
}
