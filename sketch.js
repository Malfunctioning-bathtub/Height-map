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
  seamin = createInput(0, "number");
  seamin.position(10, 10);
  seamin.size(40);
  seamax = createInput(0.5, "number");
  seamax.position(60, 10);
  seamax.size(40);
  beachmin = createInput(0.5, "number");
  beachmin.position(10, 35);
  beachmin.size(40);
  beachmax = createInput(0.55, "number");
  beachmax.position(60, 35);
  beachmax.size(40);
  grassmin = createInput(0.55, "number");
  grassmin.position(10, 60);
  grassmin.size(40);
  grassmax = createInput(0.65, "number");
  grassmax.position(60, 60);
  grassmax.size(40);
  mountainmin = createInput(0.65, "number");
  mountainmin.position(10, 85);
  mountainmin.size(40);
  mountainmax = createInput(0.75, "number");
  mountainmax.position(60, 85);
  mountainmax.size(40);
  peakmin = createInput(0.75, "number");
  peakmin.position(10, 110);
  peakmin.size(40);
  peakmax = createInput(1, "number");
  peakmax.position(60, 110);
  peakmax.size(40);

  deepseacol = createInput("#151259", "color")
  deepseacol.position(110,10)
  deepseacol.size(50, 22)
  shallowseacol = createInput("#3894b5", "color")
  shallowseacol.position(163,10)
  shallowseacol.size(50, 22)
  beachcol = createInput("#d2aa62", "color")
  beachcol.position(110,35)
  beachcol.size(50, 22)
  grasscol = createInput("#388004", "color")
  grasscol.position(110,60)
  grasscol.size(50, 22)
  mountaincol = createInput("#454545", "color")
  mountaincol.position(110,85)
  mountaincol.size(50, 22)
  peakcol = createInput("#a3a3a3", "color")
  peakcol.position(110, 110)
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
      if (altitude > seamin.value() && altitude < seamax.value()) {
        colour = lerpColor(
          color(deepseacol),
          color(shallowseacol),
          map(altitude, seamin.value(), seamax.value(), 0, 1)
        );
      } else if (altitude > beachmin.value() && altitude < beachmax.value()) {
        colour = beachcol;
      } else if (altitude > grassmin.value() && altitude < grassmax.value()) {
        colour = grasscol;
      } else if (
        altitude > mountainmin.value() &&
        altitude < mountainmax.value()
      ) {
        colour = mountaincol;
      } else if (altitude > peakmin.value() && altitude < peakmax.value()) {
        colour = peakcol;
      } else {
        colour = "#000000";
      }
      // colour = map(altitude, -1, 1, 0, 255)
      fill(colour);
      rect(x, y, cellsx, cellsy);
    }
  }
}
