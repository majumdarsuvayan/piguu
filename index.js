
let items;
let wait = 0;
let object_Detector;
let detected;
let confidence;




function setup() {
  canvas = createCanvas(1600, 700);
  canvas.position(0, 0);
  video = createCapture(VIDEO);
  video.size(1600, 700);
  video.hide();

  object_Detector = ml5.objectDetector('cocossd', modelLoaded);
}
function preload(){
  stagger = loadSound("staggered.mp3");
  
}
setInterval(
function start() {
  

    
  if (detected == "bird" && confidence > 0.5) {
    
    stagger.play();
    console.log(detected);
    console.log(confidence);
  }

}
,2000)
function modelLoaded() {
  console.log("Model loaded");

}

function draw() {
  image(video, 0, 0, 1600, 700);

    object_Detector.detect(video, gotResults);
  
}

function gotResults(error, results) {

    
    objects = results;
    
    detected = results[0].label;
    confidence = results[0].confidence;
    start();
    console.log(detected);
    object_Detector.detect(gotResults);
      
}
  

