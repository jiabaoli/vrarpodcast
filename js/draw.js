var c;
 
function setup() {
  
  var canvas = createCanvas(1800, 600);
  canvas.parent('sketch-holder');
  c = color(0);

  var button = createButton('Save Drawing');
  button.parent('sketch-button');
  button.mousePressed(saveC);
  
}
 
function draw()
{
  // display instructions
  noStroke();
  fill(200);
  rect(0, 0, 1800, 80);
  fill(0);
  textSize(32);
  textFont("monospace");
  text("Draw the future of VR/AR in your mind below...", 300, 50);
  //text("Press the 'R' key on your keyboard to change the color", 30, 40);
}

function saveC() {
  saveCanvas(canvas, 'myCanvas', 'jpg');
}
 
function mouseDragged() 
{ 
  strokeWeight(3);
  stroke(c);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function keyPressed()
{
  if(key == 'r' || key == 'R')
  {
    c = color(209, 52, 55);
  }
}