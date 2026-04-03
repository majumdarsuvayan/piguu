let video;
let object_Detector;
let objects = [];
let birdDetected = false;
let stagger;

function preload(){
  stagger = loadSound("staggered.mp3");
}

function setup() {
  canvas = createCanvas(1600, 700);
  canvas.position(0, 0);

  video = createCapture({
    video: {
      facingMode: "environment"
    }
  });

  video.size(1600, 700);
  video.hide();

  object_Detector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
  console.log("Model loaded");
  detectObjects();
}

function detectObjects(){
  object_Detector.detect(video, gotResults);
}

function draw() {
  image(video, 0, 0, 1600, 700);
}

function gotResults(error, results) {
  if (error) {
    console.log(error);
    return;
  }

  objects = results;

  // Check if any detected object is a bird
  let foundBird = false;

  for (let i = 0; i < objects.length; i++) {
    if (objects[i].label == "bird" && objects[i].confidence > 0.5) {
      foundBird = true;
      console.log("Bird detected!", objects[i].confidence);
    }
  }

  // Play sound only when bird appears first time
  if (foundBird && !birdDetected) {
    stagger.play();
    birdDetected = true;
  }

  // Reset when bird is gone
  if (!foundBird) {
    birdDetected = false;
  }

  detectObjects(); // Keep detecting
}
