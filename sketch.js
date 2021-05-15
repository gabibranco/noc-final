// game of life rules

// a cell that is surrounded by death cannot stay alive
// a cell that is surrounded by too many alive neighbors dies, because of overpopulartion

// liveCell.liveNeighbors < 2 # dies
// 2 <= liveCell.liveNeighbors <= 3 # lives
// liveCell.liveNeighbors > 3 # dies
// deadCell.liveNeighbors == 3 # becomes alive

let soundFile;

function preload() {
  soundFile = loadSound('assets/alive1.mp3');
}

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
let resolution = 10;
let res = resolution - 2;
let slider;
let sounds;

function setup() {
  createCanvas(windowWidth, 400);
  
  cols = floor(windowWidth / resolution);
  rows = floor(400 / resolution);
  slider = createSlider(2, 50, 15, 0.5);
  slider.position((windowWidth - 200)/2, 430);
  slider.style('width', '200px');
  
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
  sounds = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < cols; j++) {
      sounds[i][j] = soundFile;
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
      if (grid[i][j] == 1) {
        fill(random(50,256), random(50,256), random(50, 256));
        rect(x, y, res, res);
      } else {
        fill(30, 10, 100);
        rect(x, y, res, res);
        talk(i, j);
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
        talk(i, j);
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
        sounds[i][j].pause();
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
      if (d < resolution) {
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
  sounds[i][j].loop(0, random(0.3,1.3), 1);
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