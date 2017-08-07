import Global from './global.js';
import { createDraw } from './utils.js';

Global.addAction(() => console.log('First frame completed'));


const draw = createDraw(() => {
  window.background(25);
  window.noFill();
  window.stroke(255);
  window.ellipse(window.mouseX, window.mouseY, 100, 100);
  Global.state.graph.render();
});

export { draw };
