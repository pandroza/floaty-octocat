//Name changed to "FLOATY OCTOCAT"
//Now has title and "how to play" screen with buttons
//Sticks replaced with "gates"
//Inverted collision mechanism so you have to pass through gates without touching sides
//Three different gate types
//NPCs added
//more challenging
//better scrolling scenery added

let octocatUp;
let octocatDown;
let githubMark;
let githubLogo;

function preload() {
  soundFormats('mp3', 'ogg', 'wav');
  octocatUp = loadImage("Octocatup.png");
  octocatDown = loadImage("Octocatdown.png");
  //githubLogo = loadImage("github/GitHub_Logo.png");
  githubLogoW = loadImage("github/GitHub_Logo_White.png");
  githubMark = loadImage("github/GitHub-Mark.png");
  githubMarkL = loadImage("github/GitHub-Mark-Light.png");
  dingdong = loadSound('sound/Electronic-Chime.mp3');
  dingdong1 = loadSound('sound/Electronic-Chime.mp3');
  //dingdong1 = loadSound('sound/Beep-Ping.mp3');
  dingdong2 = loadSound('sound/Error-Alert.mp3');
  applause = loadSound('sound/Fake-Applause.wav');
  song = loadSound('music/blippytrance.mp3');
  song2 = loadSound('music/Computer_Magic.mp3');
  //boo = loadSound('sound/Crowd-Boo.mp3');
  
}

function setup() {
  createCanvas(400, 400);
  //masterVolume(0.1);
  dingdong1.rate(1.5);
  song.rate(1.5);
  //song2.playMode("untilDone");
  

}


var delayStartFC;
//gate count
var gatePassed = 0;
//skyscraper variables
var skyX;
var skyY;
var skyW;
var skyH;
var gates = [];
var marks = [];
//var skyColor = color(122, 107, 107);
//var windowColor1 = color(230, 99, 99);
//var windowColor2 = color(255, 0, 238);

// screen variable
var gameMode = 1;

// GitHub Marks
var Mark = function(x, y, gm) {
  this.x = x;
  this.y = y;
  this.img = gm;
  this.speed = 2;
};
Mark.prototype.draw = function() {
  image(this.img, this.x, this.y, 45, 45);
};
//Player
var gateHit = false;
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.size = 60;
  this.screen = 400;
  this.img = octocatDown;
  this.score = 0;
  this.distance = [];
};
Player.prototype.draw = function() {
  fill(255, 0, 0);
  this.y = constrain(this.y, 0, this.screen - 50);
  image(this.img, this.x, this.y, this.size, this.size * 3 / 4);
};
//Player movement

Player.prototype.hop = function() {
  this.img = octocatUp;
  this.y -= 3;
};
Player.prototype.fall = function() {
  this.img = octocatDown;
  this.y += 3;
};
//Player + Mark collision detection

Player.prototype.checkMark = function(marks) {
  this.distance = dist(this.x, this.y, marks.x, marks.y);
  if (this.distance <= 70 / 2) {
    this.score++;
    dingdong1.play();
    marks.y -= 800;
  }
};
// Player + Gate collision detection

Player.prototype.checkGate = function(gates) {
  if (gates.direction === "right") {
    if (this.x === (gates.x - 16)) {
      gates.gateSwitch = true;
      //gOn = true;
    }
    if ((gates.gateSwitch === true && this.x >= (gates.x - 10) && this.x <= (gates.x + 10)) &&
      (this.y >= gates.y + 13 || this.y <= (gates.y - 58))) {
      dingdong2.play();
      gates.triColorR = ("red");
      gatePassed++;
      gates.gateSwitch = false;
      //gR = true;
    }
    if (this.x === (gates.x + 12) && gates.gateSwitch !== false) {
      gates.triColorR = ("lightgreen");
      dingdong.play();
      this.score++;
      gatePassed++;
    }

  } else if (gates.direction === "down") {

    if (gates.triSwitch === true && this.y >= (gates.y - 47) && this.y < (gates.y + 7) &&
      this.x >= (gates.x - 122) && this.x <= (gates.x - 75) || gates.triSwitch === true &&
      this.y >= (gates.y - 47) && this.y < (gates.y + 7) &&
      this.x >= (gates.x + 13) && this.x <= (gates.x + 56)) {
      dingdong2.play();
      gates.triColorD = ("red");
      gatePassed++;
      gates.triSwitch = false;
    }
    if (this.y < (gates.y - 47) && this.x > (gates.x - 110) &&
      this.x < (gates.x + 14)) {
      gates.aboveSwitch = true;
    }
    if (this.y > (gates.y + 7) && this.x > (gates.x - 110) &&
      this.x < (gates.x + 70) && gates.aboveSwitch === true) {
      gates.belowSwitch = true;
    }
    if (this.x === (gates.x + 72) && gates.aboveSwitch === true &&
      gates.belowSwitch === true && gates.triSwitch === true) {
      gates.triColorD = ("lightgreen");
      dingdong.play();
      this.score++;
      gatePassed++;
    } else if (this.x === (gates.x + 72) && gates.belowSwitch === false && gates.triSwitch === true) {
      gates.triColorD = ("red");
      dingdong2.play();
      gatePassed++;
    }

  } else if (gates.direction === "up") {
    if (gates.triSwitch === true && this.y >= (gates.y - 47) && this.y < (gates.y + 7) &&
      this.x >= (gates.x - 122) && this.x <= (gates.x - 75) || gates.triSwitch === true &&
      this.y >= (gates.y - 47) && this.y < (gates.y + 7) &&
      this.x >= (gates.x + 13) && this.x <= (gates.x + 56)) {
      gates.triColorU = ("red");
      dingdong2.play();
      gatePassed++;
      gates.triSwitch = false;
    }
    if (this.y > (gates.y + 7) && this.x > (gates.x - 110) &&
      this.x < (gates.x + 14)) {
      gates.belowSwitch = true;
    }
    if (this.y < (gates.y - 47) && this.x > (gates.x - 110) &&
      this.x < (gates.x + 70) && gates.belowSwitch === true) {
      gates.aboveSwitch = true;
    }
    if (this.x === (gates.x + 72) && gates.aboveSwitch === true &&
      gates.belowSwitch === true && gates.triSwitch === true) {
      gates.triColorU = ("lightgreen");
      dingdong.play();
      this.score++;
      gatePassed++;

    } else if (this.x === (gates.x + 72) && gates.aboveSwitch === false && gates.triSwitch === true) {
      gates.triColorU = ("red");
      dingdong2.play();
      gatePassed++;
    }
  }
};
//gates

var Gate = function(x, y, right) {
  this.x = x;
  this.y = y;
  this.gateSwitch = false;
  this.aboveSwitch = false;
  this.belowSwitch = false;
  this.triSwitch = true;
  this.direction = right;
  this.triColorR = "magenta";
  this.triColorU = "orange";
  this.triColorD = "blue";
};
Gate.prototype.draw = function() {
  if (this.direction === "right") {
    fill(255, 255, 255);
    rectMode(CENTER);
    rect(this.x, this.y, 16, 140);
    fill(this.triColorR);
    triangle(this.x - 8, this.y - 70, this.x + 8, this.y - 62, this.x - 8, this.y - 54);
    triangle(this.x - 8, this.y + 70, this.x + 8, this.y + 62, this.x - 8, this.y + 54);
    fill(162, 233, 235);
    rect(this.x, this.y, 16, 108);

  } else if (this.direction === "down") {
    fill(255, 255, 255);
    rectMode(CENTER);
    rect(this.x, this.y, 140, 16);
    fill(this.triColorD);
    triangle(this.x - 70, this.y - 8, this.x - 62, this.y + 8, this.x - 54, this.y - 8);
    triangle(this.x + 70, this.y - 8, this.x + 62, this.y + 8, this.x + 54, this.y - 8);
    fill(162, 233, 235);
    rect(this.x, this.y, 108, 16);
  } else if (this.direction === "up") {
    fill(255, 255, 255);
    rectMode(CENTER);
    rect(this.x, this.y, 140, 16);
    fill(this.triColorU);
    triangle(this.x - 70, this.y + 8, this.x - 54, this.y + 8, this.x - 62, this.y - 8);
    triangle(this.x + 70, this.y + 8, this.x + 54, this.y + 8, this.x + 62, this.y - 8);
    fill(162, 233, 235);
    rect(this.x, this.y, 108, 16);
  }
};
var player = new Player(50, 43);

var newGatesAndMarks = function() {
  gates.push(new Gate(600, 100, "right"));
  gates.push(new Gate(900, 100, "right"));
  gates.push(new Gate(1050, 210, "down"));
  gates.push(new Gate(1250, 210, "up"));
  gates.push(new Gate(1400, 130, "right"));
  gates.push(new Gate(1650, 150, "up"));
  gates.push(new Gate(1860, 210, "down"));
  gates.push(new Gate(2050, 210, "up"));
  gates.push(new Gate(2600, 170, "right"));
  gates.push(new Gate(2700, 150, "right"));
  gates.push(new Gate(2950, 210, "down"));
  gates.push(new Gate(3100, 260, "right"));
  
  gates.push(new Gate(4310, 270, "up"));
  gates.push(new Gate(4350, 210, "up"));
  gates.push(new Gate(4390, 150, "up"));
  gates.push(new Gate(4430, 90, "up"));
  gates.push(new Gate(4600, 100, "right"));
  gates.push(new Gate(4750, 100, "right"));
  gates.push(new Gate(4900, 100, "right"));
  gates.push(new Gate(5300, 150, "down"));
  gates.push(new Gate(5340, 210, "down"));
  gates.push(new Gate(5380, 270, "down"));
  gates.push(new Gate(5550, 270, "up"));
  gates.push(new Gate(5590, 210, "up"));
  gates.push(new Gate(5630, 150, "up"));
  gates.push(new Gate(5750, 100, "right"));
  gates.push(new Gate(5850, 200, "down"));
  gates.push(new Gate(5950, 300, "right"));
  gates.push(new Gate(6150, 250, "down"));
  gates.push(new Gate(6350, 250, "up"));
  gates.push(new Gate(6650, 250, "right"));
  gates.push(new Gate(6780, 200, "right"));
  gates.push(new Gate(6910, 250, "right"));
  gates.push(new Gate(7020, 200, "right"));
  gates.push(new Gate(7150, 250, "right"));
  
  marks.push(new Mark(700, 140, githubMark));
  marks.push(new Mark(1270, 20, githubMarkL));
  marks.push(new Mark(1480, 100, githubMark));
  marks.push(new Mark(2000, 20, githubMarkL));
  marks.push(new Mark(2190, 300, githubMark));
  marks.push(new Mark(2330, 20, githubMarkL));
  marks.push(new Mark(2470, 300, githubMark));
  
  marks.push(new Mark(3300, 300, githubMarkL));
  marks.push(new Mark(3500, 20, githubMark));
  marks.push(new Mark(3700, 80, githubMarkL));
  marks.push(new Mark(3900, 140, githubMark));
  marks.push(new Mark(4100, 300, githubMarkL));
  
  marks.push(new Mark(5030, 20, githubMark));
  marks.push(new Mark(5090, 80, githubMarkL));
  marks.push(new Mark(6550, 140, githubMark));
  
  
}
//background
var skyscraperXs = [];
for (let i = 0; i < 10; i++) {
  skyscraperXs.push(i * 40);
}
var skyscraper2Xs = [];
for (let i = 0; i < 6; i++) {
  skyscraper2Xs.push(i * 80);
}
var skyscraper3Xs = [];
for (let i = 0; i < 8; i++) {
  skyscraper3Xs.push(i * 100);
}

var skyscraper = function(skyX, skyY, skyW, skyColor) {
  noStroke();
  fill(skyColor); // skyscrapper
  rect(skyX, skyY, skyW, skyW * 4);
  fill(windowColor1);
  rect(skyX + skyW * 1 / 5, skyY + skyW * 2 / 5, skyW * 1 / 5, skyW * 1 / 5);
  rect(skyX + skyW * 3 / 5, skyY + skyW * 2 / 5, skyW * 1 / 5, skyW * 1 / 5);
  rect(skyX + skyW * 1 / 5, skyY + skyW * 4 / 5, skyW * 1 / 5, skyW * 1 / 5);
  rect(skyX + skyW * 3 / 5, skyY + skyW * 4 / 5, skyW * 1 / 5, skyW * 1 / 5);
  rect(skyX + skyW * 1 / 5, skyY + skyW * 6 / 5, skyW * 1 / 5, skyW * 1 / 5);
  rect(skyX + skyW * 3 / 5, skyY + skyW * 6 / 5, skyW * 1 / 5, skyW * 1 / 5);
};
// start screens clickable buttons
var btn1 = {
  x: 40,
  y: 300,
  width: 130,
  height: 50,
  message: "CLICK ME"
  //colour: color(97, 224, 126)
};
var btn2 = {
  x: 300,
  y: 300,
  width: 90,
  height: 50,
  message: "START"
  //colour: color(130, 229, 232)
};
var drawButton = function(btn) {
  fill(255, 255, 255);
  rect(btn.x, btn.y, btn.width, btn.height, 5);
  fill(0, 0, 0);
  textSize(22);
  textAlign(LEFT, TOP);
  text(btn.message, btn.x + 10, btn.y + btn.height / 4);
};
var isMouseInside = function(btn) {
  return (mouseX >= btn.x &&
    mouseX <= (btn.x + btn.width) &&
    mouseY >= btn.y &&
    mouseY <= (btn.y + btn.height));
};
mouseClicked = function() {
  if (isMouseInside(btn1)) {
    dingdong.play();
    (gameMode = 2);
  } else if (isMouseInside(btn2)) {
    dingdong.play();
    player.score = 0;
    gatePassed = 0;
    player.size = 60;
    player.screen = 400;
    player = new Player(50, 43);
    newGatesAndMarks();
    delayStartFC = frameCount;
    song.play();
    (gameMode = 3);
  }
};

function draw() {
  if (gameMode === 1) {
    
    //song2.play();
    rectMode(CORNER);
    background(51, 204, 171);
    fill(49, 92, 45);
    textSize(40);
    text("FLOATY OCTOCAT", 15, 100, 390, 100);
    drawButton(btn1);
  } else if (gameMode === 2) {
    background(38, 32, 217);
    fill(130, 229, 232);
    textSize(20);
    text("HOW TO PLAY:", 15, 40, 390, 100);
    //textFont(f,20);
    text("PRESS SPACE BAR TO MAKE OCTOCAT MOVE UP", 15, 120, 380, 100);
    text("SCORE POINTS BY FLYING THROUGH GATES IN RIGHT DIRECTION", 15, 180, 380, 100);
    text("COLLECT GITHUB COINS FOR MORE POINTS", 15, 240, 380, 100);
    text("TRY AND GET HIGHEST SCORE!", 15, 300, 200, 100);
    drawButton(btn2);
  } else if (gameMode === 3) {
    background(92, 158, 158);
    rectMode(CORNER);
    //text(delayStartFC, 15, 40, 390, 100);
    //text(frameCount, 15, 60, 390, 100);
    skyColor = color(80, 85, 92);
    windowColor1 = color(148, 158, 15);

    for (let i = 0; i < 10; i++) {
      skyscraper(skyscraperXs[i], 350, 20, skyColor);
      skyscraperXs[i] -= 0.5;
      if (skyscraperXs[i] <= -30) {
        skyscraperXs[i] = width;
      }
    }
    skyColor = color(135, 137, 148);
    windowColor1 = color(235, 222, 42);

    for (let i = 0; i < skyscraper2Xs.length; i++) {
      skyscraper(skyscraper2Xs[i], 330, 30, skyColor);
      // image(githubLogo, skyscraper2Xs[4], 322, 35, 20);
      skyscraper2Xs[i] -= 1;
      if (skyscraper2Xs[i] <= -40) {
        skyscraper2Xs[i] = width;
      }
    }
    windowColor1 = color(224, 224, 110);
    skyColor = color(169, 168, 179);

    for (let i = 0; i < skyscraper3Xs.length; i++) {
      skyscraper(skyscraper3Xs[i], 300, 50, skyColor);
      
      fill("black");
      image(githubLogoW, skyscraper3Xs[7] + 2, 286, 45, 35);
      skyscraper3Xs[i] -= 1.5;
      if (skyscraper3Xs[i] <= -60) {
        skyscraper3Xs[i] = width * 2;
      }
    }
    for (let i = 0; i < gates.length; i++) {
      gates[i].draw();
      player.checkGate(gates[i]);
      gates[i].x -= 2;
    }
    for (var i = 0; i < marks.length; i++) {
      marks[i].draw();
      player.checkMark(marks[i]);
      marks[i].x -= 2;
      marks[i].y += marks[i].speed;
      if (marks[i].y > 300) {
        marks[i].speed = -2;
      }
      if (marks[i].y < 20) {
        marks[i].speed = 2;
      }
    }
    textSize(18);
    text("Score: " + player.score, 10, 20);
    if (gatePassed === 35 && player.score === 50) {
      textSize(36);
      text("YOU WIN!!!!", 80, 100);
    } else if (gatePassed === 35 && player.score < 50) {
      textSize(36);
      text("YOU SCORED " + player.score + "!", 40, 100);
    }
    if (delayStartFC && (frameCount - delayStartFC) === 3650) {
      applause.play();
      //boo.play();
    }
    if (delayStartFC && (frameCount - delayStartFC) >= 3650 && delayStartFC && (frameCount - delayStartFC) <= 3775) {
      player.screen -= 1.5;
      player.size += 2;
    }
    if (delayStartFC && (frameCount - delayStartFC) === 4700) {
      marks = [];
      gates = [];
      song.stop();
      gameMode = 1;
    }
    if (keyIsPressed === true) {
      player.hop();
    } else {
      player.fall();
    }
    player.draw();
  }
}