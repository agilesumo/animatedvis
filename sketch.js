//

const ONE_PERCENT_WEIGHT = 6;

const WASH_MACHINE_PERCENT = 11;
const SHOWER_PERCENT = 14;
const TUB_PERCENT = 15;
const TOILET_PERCENT = 28;
const TAP_PERCENT = 32;

const STARTING_SIZE = 20;

let washMachineMax = ONE_PERCENT_WEIGHT * WASH_MACHINE_PERCENT;
let showerMax = ONE_PERCENT_WEIGHT * SHOWER_PERCENT;
let tubMax = ONE_PERCENT_WEIGHT * TUB_PERCENT;
let toiletMax = ONE_PERCENT_WEIGHT * TOILET_PERCENT;
let tapMax = ONE_PERCENT_WEIGHT * TAP_PERCENT;

let washMachineObject;
let showerObject;
let tubObject;
let toiletObject;
let tapObject;

let animationRunning = false;
let washMachineFinished = false;
let showerFinished = false;
let tubFinished = false;
let toiletFinished = false;
let tapFinished = false;

let imageShower;

let i = STARTING_SIZE;

//============================

let imgToilet;
let imgTub;
let imgTap;
let imgWashMachine;

let beginVisualisation;
let canvas;



function setup() {

    imgWashMachine = loadImage("assets/washing_machine.png");
  imgTub = loadImage("assets/bathtub.png");

  imgToilet = loadImage("assets/toilet.png");
  imgShower = loadImage("assets/shower.png");
  imgTap = loadImage("assets/tap.png");
  canvas = createCanvas(512, 512);

  startVisualisation = createButton("Home Water Usage Visualisation", "white");
  startVisualisation.position(width / 2 - 125, height / 2 - 75);
  startVisualisation.style("width", "250px");
  startVisualisation.style("height", "150px");
  startVisualisation.style("padding", "12px");
  startVisualisation.style("border-radius", "10px");
  startVisualisation.style("font-size", "26px");
  startVisualisation.style("background-color", color(200, 255, 255));

  washMachineObject = {
    name: "Washing Machine",
    theImage: imgWashMachine,
    percent: WASH_MACHINE_PERCENT,
    maxSize: washMachineMax,
    xPosition: 25,
    yPosition: 100,
  };
  showerObject = {
    name: "Shower",
    theImage: imgShower,
    percent: SHOWER_PERCENT,
    maxSize: showerMax,
    xPosition: 420,
    yPosition: 320,
  };
  tubObject = {
    name: "Bathtub",
    theImage: imgTub,
    percent: TUB_PERCENT,
    maxSize: tubMax,
    xPosition: 20,
    yPosition: 320,
  };
  toiletObject = {
    name: "Toilet",
    theImage: imgToilet,
    percent: TOILET_PERCENT,
    maxSize: toiletMax,
    xPosition: 150,
    yPosition: 175,
  };
  tapObject = {
    name: "Tap",
    theImage: imgTap,
    percent: TAP_PERCENT,
    maxSize: tapMax,
    xPosition: 330,
    yPosition: 50,
  };

  startVisualisation.mousePressed(runAnimation);
  noLoop();
}

// Paint the background either
// red, yellow, blue, or green.
function runAnimation() {
  animationRunning = true;
  startVisualisation.remove();
  draw();
}

function draw() {
  //Light Silver background
  background(217, 217, 217);

  if (animationRunning === true) {
    if (washMachineFinished === false) {
      growGraphic(washMachineObject);
    } else if (showerFinished === false) {
      growGraphic(showerObject);
    } else if (tubFinished === false) {
      growGraphic(tubObject);
    } else if (toiletFinished === false) {
      growGraphic(toiletObject);
    } else if (tapFinished === false) {
      growGraphic(tapObject);
    } else {
      drawFinishedImages();
    }
  }
}

function growGraphic(category) {
  loop();
  print("Ran grow graphic function");
  if (i <= category.maxSize) {
    image(
      category.theImage,
      width / 2 - category.maxSize / 2,
      height / 2 - category.maxSize / 2,
      i,
      i
    );
    i++;
  }
  if (i === category.maxSize) {
    noLoop();
    textSize(42);
    textAlign(CENTER);
    fill("black");
    stroke("yellow");
    strokeWeight(3);
    text("" + category.percent + "%", width / 2, 50);
    i = STARTING_SIZE;
    if (category.name === "Washing Machine") {
      washMachineFinished = true;
      print("set wash machine to finished");
    } else if (category.name === "Shower") {
      showerFinished = true;
    } else if (category.name === "Bathtub") {
      tubFinished = true;
    } else if (category.name === "Toilet") {
      toiletFinished = true;
    } else if (category.name === "Tap") {
      tapFinished = true;
    }
    setTimeout(function () {
      loop();
      print("got to time out");
    }, 2500);
  }
}
function drawFinishedImages() {
  drawFinishedImage(washMachineObject);

  drawFinishedImage(showerObject);

  drawFinishedImage(tubObject);

  drawFinishedImage(toiletObject);

  drawFinishedImage(tapObject);

  strokeWeight(0);
  textSize(22);
  fill("black");
  textAlign(CENTER);
  textStyle(BOLD);
  text("Household Water Usage", 256, 25);
}

function drawFinishedImage(category) {
  if (over(category)) {
    print("Worked");
    tint(175, 180);
    textSize(24);
    strokeWeight(1);
    text(
      category.name + " : " + category.percent + " %",
      width / 2,
      height - 50
    );
  } else {
    noTint();
  }
  image(
    category.theImage,
    category.xPosition,
    category.yPosition,
    category.maxSize,
    category.maxSize
  );
}

function over(category) {
  if (
    mouseX > category.xPosition &&
    mouseX < category.xPosition + category.maxSize &&
    mouseY > category.yPosition &&
    mouseY < category.yPosition + category.maxSize
  ) {
    return true;
  } else {
    return false;
  }
}
