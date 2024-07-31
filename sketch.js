let seamax;
let beachmax;
let grassmax;
let mountainmax;
let peakmax;
let deepseacol
let shallowseacol
let beachcol
let grasscol
let mountaincol
let peakcol

let redrawbutton;
let seed
let randomseed
// predefining values
let cellsx;
let cellsy;
let hue;
let saturation;
let brightness;

let scale

function setup() {
  seed = random(0, 1000000)

  seamax = createInput(0.6, "number");
  seamax.position(10, 10);
  seamax.size(40);
  beachmax = createInput(0.65, "number");
  beachmax.position(10, 35);
  beachmax.size(40);
  grassmax = createInput(0.75, "number");
  grassmax.position(10, 60);
  grassmax.size(40);
  mountainmax = createInput(0.85, "number");
  mountainmax.position(10, 85);
  mountainmax.size(40);
  
  deepseacol = createInput("#180934", "color")
  deepseacol.position(61,10)
  deepseacol.size(50, 22)
  shallowseacol = createInput("#357d7e", "color")
  shallowseacol.position(115,10)
  shallowseacol.size(50, 22)
  beachcol = createInput("#ffe3b3", "color")
  beachcol.position(61,35)
  beachcol.size(50, 22)
  grasscol = createInput("#234d23", "color")
  grasscol.position(61,60)
  grasscol.size(50, 22)
  mountaincol = createInput("#60666c", "color")
  mountaincol.position(61,85)
  mountaincol.size(50, 22)
  peakcol = createInput("#d6cbd8", "color")
  peakcol.position(61, 110)
  peakcol.size(50, 22)

  redrawbutton = createButton("redraw");
  redrawbutton.position(10, 500);
  redrawbutton.mousePressed(rendermap);
  scale = createSlider(20, 300, 100);
  scale.position(10, 133);
  scale.size(99);
  seedinput = createInput(seed, "number")
  seedinput.position(10, 155)
  seedinput.size(94)

  createCanvas(1920, 1080);
  let numCellsx = width;
  let numCellsy = height;
  cellsx = width / numCellsx;
  cellsy = height / numCellsy;
  noStroke();
}

function draw(){}

function rendermap() {
    noiseSeed(seedinput.value())
  for (let x = 0; x <= width; x += cellsx) {
    for (let y = 0; y <= height; y += cellsy) {
      let altitude = noise(x / scale.value(), y / scale.value());
      if (altitude < seamax.value()) {
        colour = lerpColor(
          color(deepseacol.value()),
          color(shallowseacol.value()),
          map(altitude, 0, seamax.value(), 0, 1)
        );
      } 
      else if (altitude < beachmax.value()) {
        colour = beachcol.value();
      } 
      else if (altitude < 1) {
        colour = lerpColor(
          color(grasscol.value()),
          lerpColor(color(mountaincol.value()), color(peakcol.value()), map(altitude, beachmax.value(), mountainmax.value(), 0, 1)), 
          map(altitude, beachmax.value(), 1, 0, 1)
        );
        
      } 
      else {
        colour = "#000000";
      }
      // colour = map(altitude, -1, 1, 0, 255)
      fill(colour);
      rect(x, y, cellsx, cellsy);
    }
  }
}
