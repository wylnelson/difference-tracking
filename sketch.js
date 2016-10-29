var video;
var display;
var bgImage;

var threshold = 20;

var song;

var squares = [];

function preload() {
  song = loadSound('assets/rip.mp3');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(320, 240);

  bgImage = createImage(width, height);
  display = createImage(width, height);

  for (var i = 0; i < 1; i++) {
    squares[i] = new Glitch(random(0, windowWidth - 20), random(0, windowHeight - 20), 20, 20, 255, 50);
  }

}

function draw() {
  video.loadPixels();
bgImage.loadPixels();
  display.loadPixels();


song.loop();

  for (var x = 0; x < video.width; x++) {
    for (var y = 0; y < video.height; y++) {
      var loc = (x + y * video.width) * 4;
      var r1 = video.pixels[loc];
      var g1 = video.pixels[loc + 1];
      var b1 = video.pixels[loc + 2];
      
      
      var r2 = bgImage.pixels[loc];
      var g2 = bgImage.pixels[loc + 1];
      var b2 = bgImage.pixels[loc + 2];


  var diff = dist(r1, g1, b1, r2, g2, b2);

      if (diff > threshold) {
        display.pixels[loc] = video.pixels[loc];
        display.pixels[loc + 1] = video.pixels[loc + 1];
        display.pixels[loc + 2] = video.pixels[loc + 2];
        display.pixels[loc + 3] = video.pixels[loc + 3];

      } else {
        bgImage.pixels[loc];
        bgImage.pixels[loc + 1];
        bgImage.pixels[loc + 2];
        bgImage.pixels[loc + 3];
        for (var i = 0; i < squares.length; i++){
          squares[i].display();
        }
      }
    }
  }

  display.updatePixels();
  image(display, 0, 0);

}

function mousePressed() {
  for (var i = 0; i < video.pixels.length; i++) {
    bgImage.pixels[i] = video.pixels[i];
  }

  bgImage.updatePixels();
  changeThreshold();
}

function changeThreshold() {
  threshold = map(mouseX, 0, width, 0, 175);
  print("Threshold is now: " + threshold);
}

function Glitch(x, y, l, w, r, o) {
  this.x = x;
  this.y = y;
  this.l = l;
  this.w = w;
  this.r = r;
  this.o = o;

  this.display = function() {
    fill(this.r, this.o, this.o);
    rect(this.x, this.y, this.l, this.w);
  }
}