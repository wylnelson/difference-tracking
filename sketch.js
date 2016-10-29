var capture;
var output;
var bgImage;

var threshold = 20;

var song;

function preload() {
  song = loadSound('assets/rip.mp3');
}

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.size(320, 240);

  bgImage = createImage(width, height);
  output = createImage(width, height);

}

function draw() {

  capture.loadPixels();
bgImage.loadPixels();
  output.loadPixels();
  
  song.loop();


  for (var x = 0; x < capture.width; x++) {
    for (var y = 0; y < capture.height; y++) {
      var loc = (x + y * capture.width) * 4;
      var r1 = capture.pixels[loc];
      var g1 = capture.pixels[loc + 1];
      var b1 = capture.pixels[loc + 2];
      
      
      var r2 = bgImage.pixels[loc];
      var g2 = bgImage.pixels[loc + 1];
      var b2 = bgImage.pixels[loc + 2];

      var diff = dist(r1, g1, b1, r2, g2, b2);

      
      if (diff > threshold) {
        output.pixels[loc] = capture.pixels[loc];
        output.pixels[loc + 1] = capture.pixels[loc + 1];
        output.pixels[loc + 2] = capture.pixels[loc + 2];
        output.pixels[loc + 3] = capture.pixels[loc + 3];

      } else {
        bgImage.pixels[loc];
        bgImage.pixels[loc + 1];
        bgImage.pixels[loc + 2];
        bgImage.pixels[loc + 3];
      }
    }
  }

  output.updatePixels();
  image(output, 0, 0);

}

function mousePressed() {
  for (var i = 0; i < capture.pixels.length; i++) {
    bgImage.pixels[i] = capture.pixels[i];
  }

  bgImage.updatePixels();
  changeThreshold();
}

function changeThreshold() {
  threshold = map(mouseX, 0, width, 100, 175);
  print("Threshold is now: " + threshold);
}