let seamax;
let beachmax;
let grassmax;
let mountainmax;
let peakmax;
let deepseacol;
let shallowseacol;
let beachcol;
let grasscol;
let mountaincol;
let peakcol;

let redrawbutton;
let cellsx;
let cellsy;
let img;
let colour;

function preload() {
  img = loadImage("https://picsum.photos/500/500");

}

function setup() {
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
  peakmax = createInput(1, "number");
  peakmax.position(10, 110);
  peakmax.size(40);
  
  deepseacol = createInput("#180934", "color");
  deepseacol.position(61, 10);
  deepseacol.size(50, 22);
  shallowseacol = createInput("#357d7e", "color");
  shallowseacol.position(115, 10);
  shallowseacol.size(50, 22);
  beachcol = createInput("#ffe3b3", "color");
  beachcol.position(61, 35);
  beachcol.size(50, 22);
  grasscol = createInput("#234d23", "color");
  grasscol.position(61, 60);
  grasscol.size(50, 22);
  mountaincol = createInput("#60666c", "color");
  mountaincol.position(61, 85);
  mountaincol.size(50, 22);
  peakcol = createInput("#d6cbd8", "color");
  peakcol.position(61, 110);
  peakcol.size(50, 22);

  redrawbutton = createButton("redraw");
  redrawbutton.position(10, 500);
  redrawbutton.mousePressed(rendermap);

  createCanvas(img.width, img.height);
  noStroke();

  rendermap();
}

function rendermap() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let altitude = getheight(x, y);
      let colour;
      if (altitude < seamax.value()) {
        colour = lerpColor(
          color(deepseacol.value()),
          color(shallowseacol.value()),
          map(altitude, 0, seamax.value(), 0, 1)
        );
      } else if (altitude < beachmax.value()) {
        colour = color(beachcol.value());
      } else if (altitude < grassmax.value()) {
        colour = color(grasscol.value());
      } else if (altitude < mountainmax.value()) {
        colour = lerpColor(
          color(grasscol.value()),
          color(mountaincol.value()),
          map(altitude, grassmax.value(), mountainmax.value(), 0, 1)
        );
      } else if (altitude <= peakmax.value()) {
        colour = lerpColor(
          color(mountaincol.value()),
          color(peakcol.value()),
          map(altitude, mountainmax.value(), peakmax.value(), 0, 1)
        );
      } else {
        colour = color("#000000");
      }
      fill(colour);
      rect(x, y, 1, 1);
    }
  }
}

function getheight(x, y) {
  let colour = color(img.get(x, y));
  colorMode(HSB);
  let b = brightness(colour) / 100;
  colorMode(RGB);
  return b;
}
