class LivingCreatore {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.multiply = 0;
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ];
  }
  chooseCell(character) {
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }



}


class Grass extends LivingCreatore {

  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (newCell && this.multiply >= 8) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 1;

      var newGrass = new Grass(newX, newY);
      grassArr.push(newGrass);
      this.multiply = 0;
    }
  }
}

class GrassEater extends LivingCreatore {
  constructor(x, y, index) {
    super(x, y, index);
    this.energy = 8;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ];
  }
  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }




  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (newCell && this.multiply >= 15) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 2;

      var newGr = new GrassEater(newX, newY);
      grassEaterArr.push(newGr);
      this.multiply = 0;
    }
  }


  move() {
    this.energy--;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);
    if (newCell && this.energy >= 0) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
    } else {
      if (this.energy < 0) {
        this.die();
      }
    }
  }

  eat() {
    var mushroomCells = this.chooseCell(4);
    var mushroomCell = random(mushroomCells);
    if (mushroomCell) {
      var newX = mushroomCell[0];
      var newY = mushroomCell[1];
      matrix[newY][newX] = 3;
      matrix[this.y][this.x] = 0;
      var newPred = new Predator(newX, newY);
      predatorArr.push(newPred);
      for (var i in mushroomArr) {
        if (newX == mushroomArr[i].x && newY == mushroomArr[i].y) {
          mushroomArr.splice(i, 1);
          break;
        } else {
          mushroomArr.pop();
        }
      }
      this.die();
      return;
    }
    var appleCells = this.chooseCell(4);
    var appleCell = random(appleCells);
    if (appleCell) {
      this.energy += 3;
      var newX = appleCell[0];
      var newY = appleCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
      for (var i in appleArr) {
        if (newX == appleArr[i].x && newY == appleArr[i].y) {
          appleArr.splice(i, 1);
          break;
        }
      }
    } else {
      var grassCells = this.chooseCell(1);
      var grassCell = random(grassCells);
      if (grassCell) {
        this.energy++;
        var newX = grassCell[0];
        var newY = grassCell[1];
        matrix[newY][newX] = matrix[this.y][this.x];
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
        for (var i in grassArr) {
          if (newX == grassArr[i].x && newY == grassArr[i].y) {
            grassArr.splice(i, 1);
            break;
          }
        }
      } else {
        this.move();
      }
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (var i in grassEaterArr) {
      if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
        grassEaterArr.splice(i, 1);
        break;
      }
    }
  }
}

class Predator extends LivingCreatore {
  constructor(x, y, index) {
    super(x, y, index);
    this.energy = 8;
  }
  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ];
  }
  chooseCell(character) {
    this.getNewCoordinates();
    return super.chooseCell(character);
  }
  move() {
    this.energy--;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);
    if (newCell && this.energy >= 0) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
    } else {
      if (this.energy < 0) {
        this.die();
      }
    }
  }
  eat() {
    var emptyCells = this.chooseCell(2);
    var newCell = random(emptyCells);
    if (newCell) {
      this.energy++;
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
      for (var i in grassEaterArr) {
        if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
    } else {
      this.move();
    }
  }
  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (newCell && this.multiply >= 25) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 3;

      var newGrass = new Predator(newX, newY);
      predatorArr.push(newGrass);
      this.multiply = 0;
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (var i in predatorArr) {
      if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
        predatorArr.splice(i, 1);
        break;
      }
    }
  }
}

class Apple extends LivingCreatore {

  

  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (newCell && this.multiply >= 30) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 4;

      var newApple = new Apple(newX, newY);
      appleArr.push(newApple);
      this.multiply = 0;
    }
  }
}
class Mushroom extends LivingCreatore {
  

  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (newCell && this.multiply >= 60) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 4;

      var newMushroom = new Mushroom(newX, newY);
      mushroomArr.push(newMushroom);
      this.multiply = 0;
    }
  }
}
