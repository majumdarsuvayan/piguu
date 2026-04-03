Status = "";
input_text = "";
objectDetector="";
function setup(){
    canvas = createCanvas(300,290);
    canvas.position(0,0);
    video = createCapture(VIDEO);
    video.size(300,290);
    video.hide();
}
function start(){
    console.log("h");
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_text = document.getElementById("input_id").value;
    console.log(object_Detector);
}
function modelLoaded(){
    console.log("Model_Loaded");
    Status = true;
}
function draw(){
    image(video,0,0,300,290);
}