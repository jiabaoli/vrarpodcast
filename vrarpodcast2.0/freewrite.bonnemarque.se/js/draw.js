var c;
 
function setup() {
  createCanvas(1800, 600);
  c = color(0);
}
 
function draw()
{
  // display instructions
  noStroke();
  fill(200);
  rect(0, 0, 1800, 80);
  fill(0);
    textSize(32);
  text("Draw the future of VR/AR in your mind below.", 400, 50);
  //text("Press the 'R' key on your keyboard to change the color", 30, 40);
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