// game of life rules

// a cell that is surrounded by death cannot stay alive
// a cell that is surrounded by too many alive neighbors dies, because of overpopulartion

// liveCell.liveNeighbors < 2 # dies
// 2 <= liveCell.liveNeighbors <= 3 # lives
// liveCell.liveNeighbors > 3 # dies
// deadCell.liveNeighbors == 3 # becomes alive

function make2DArray(cols, rows) {
  let arr = Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 20;
let res = resolution - 2;
let slider;
let sounds;
let size = 500;

function setup() {
  createCanvas(size, size);

  cols = floor(size / resolution);
  rows = floor(size / resolution);
  slider = createSlider(2, 50, 15, 0.5);
  slider.position("", (size + 30));
  slider.style('width', '200px');

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = floor(random(0,2));
    }
  }

  sounds = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      sounds[i][j] = new Sound();
    }
  }
}

function draw() {
  let fps = slider.value();
  frameRate(fps);
  background(255);
  noStroke();
  cursor(CROSS);


  let next = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (frameCount > 30) {
        if (grid[i][j] == 1) {
          fill(random(50,256), random(50,256), random(50, 256));
          rect(x, y, res, res);
          sounds[i][j].startLoop();
        } else {
          fill(30, 10, 100);
          rect(x, y, res, res);
          sounds[i][j].stopLoop();
        }
      }
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      let state = grid[i][j];

      // Count live neighbors!
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);


      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
        // sounds[i][j].soundFile.pause();
      } else {
        next[i][j] = state;
      }
    }
  }

  // Compute next cell generation based on grid
  grid = next;
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * resolution;
      let y = j * resolution;
      let d = dist(mouseX, mouseY, x, y)
      if (d < resolution/2) {
        giveLife(i, j);
        // has to play sound
      }
    }
  }
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;


      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
}

function giveLife(i, j) {
  grid[i][j] = 1;
  // talk(i, j);
  // startTalking()
}

function kill(i, j) {
  grid[i][j] = 0;
  // soundFile.pause();
  // talk(i, j);

  // stopTalking();
}

function talk(i, j) {

}
