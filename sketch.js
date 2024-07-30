let seamin;
let seamax;
let beachmin;
let beachmax;
let grassmin;
let grassmax;
let mountainmin;
let mountainmax;
let peakmin;
let peakmax;
let deepseacol
let shallowseacol
let beachcol
let grasscol
let mountaincol
let peakcol

let redrawbutton;

// predefining values
let cellsx;
let cellsy;
let hue;
let saturation;
let brightness;

let SEA = [0, 0.5];
let BEACH = [0.5, 0.55];
let GRASS = [0.55, 0.65];
let MOUNTAIN = [0.65, 0.75];
let PEAK = [0.75, 1];



let scale = 100;

function setup() {
  seamax = createInput(0.5, "number");
  seamax.position(10, 10);
  seamax.size(40);
  beachmax = createInput(0.55, "number");
  beachmax.position(10, 35);
  beachmax.size(40);
  grassmax = createInput(0.65, "number");
  grassmax.position(10, 60);
  grassmax.size(40);
  mountainmax = createInput(0.75, "number");
  mountainmax.position(10, 85);
  mountainmax.size(40);
  
  deepseacol = createInput("#2d1a51", "color")
  deepseacol.position(61,10)
  deepseacol.size(50, 22)
  shallowseacol = createInput("#266d6e", "color")
  shallowseacol.position(115,10)
  shallowseacol.size(50, 22)
  beachcol = createInput("#ffe3b3", "color")
  beachcol.position(61,35)
  beachcol.size(50, 22)
  grasscol = createInput("#1e4d1f", "color")
  grasscol.position(61,60)
  grasscol.size(50, 22)
  mountaincol = createInput("#60666c", "color")
  mountaincol.position(61,85)
  mountaincol.size(50, 22)
  peakcol = createInput("#d9c0dd", "color")
  peakcol.position(61, 110)
  peakcol.size(50, 22)

  redrawbutton = createButton("redraw");
  redrawbutton.position(10, 135);
  redrawbutton.mousePressed(rendermap);

  createCanvas(1920, 1080);
  let numCellsx = width;
  let numCellsy = height;
  cellsx = width / numCellsx;
  cellsy = height / numCellsy;
  noStroke();
}







function draw() {}

function rendermap() {
  for (let x = 0; x <= width; x += cellsx) {
    for (let y = 0; y <= height; y += cellsy) {
      let altitude = noise(x / scale, y / scale);
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
