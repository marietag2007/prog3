function generator(matLen, gr, grEat, pr, app, mushroom) {
  let matrix = [];
  for (let i = 0; i < matLen; i++) {
    matrix[i] = [];
    for (let j = 0; j < matLen; j++) {
      matrix[i][j] = 0;
    }
  }
  for (let i = 0; i < gr; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 1;
    }
  }
  for (let i = 0; i < grEat; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 2;
    }
  }
  for (let i = 0; i < pr; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 3;
    }
  }
  for (let i = 0; i < app; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 4;
    }
  }
  for (let i = 0; i < mushroom; i++) {
    let x = Math.floor(Math.random() * matLen);
    let y = Math.floor(Math.random() * matLen);
    if (matrix[x][y] == 0) {
      matrix[x][y] = 5;
    }
  }
  return matrix;
}

let side = 20;

let matrix = generator(15, 50, 16, 2, 5, 2);

let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let appleArr = [];
let mushroomArr = [];

function setup() {
  createCanvas(matrix[0].length * side, matrix.length * side);
  background("#acacac");
  frameRate(3);
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        let gr = new Grass(x, y);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        let grE = new GrassEater(x, y);
        grassEaterArr.push(grE);
      } else if (matrix[y][x] == 3) {
        let pr = new Predator(x, y);
        predatorArr.push(pr);
      } else if (matrix[y][x] == 4) {
        let app = new Apple(x, y);
        appleArr.push(app);
      } else if (matrix[y][x] == 5) {
        let mushroom = new Mushroom(x, y);
        mushroomArr.push(mushroom);
      }
    }
  }
}

function draw() {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
      } else if (matrix[y][x] == 0) {
        fill("#acacac");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("red");
      } else if (matrix[y][x] == 4) {
        fill("orange");
      } else if (matrix[y][x] == 5) {
        fill("blue");
      }
      rect(x * side, y * side, side, side);
    }
  }

  for (let i in grassArr) {
    grassArr[i].mul();
  }
  for (let i in grassEaterArr) {
    grassEaterArr[i].mul();
    grassEaterArr[i].eat();
  }
  for (let i in predatorArr) {
    predatorArr[i].mul();
    predatorArr[i].eat();
  }
  for (let i in appleArr) {
    appleArr[i].mul();
  }
  for (let i in mushroomArr) {
    mushroomArr[i].mul();
  }
}
