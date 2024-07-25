// predefining values
let cellsx;
let cellsy;
let hue = 1
let saturation = 1
let brightness = 1
let DEEPSEA = [0, 0.4]
let SHALLOWSEA = [0.4, 0.5]
let BEACH = [0.5, 0.55]
let GRASS = [0.55, 0.65]
let MOUNTAIN = [0.65, 0.74]
let PEAK = [0.74, 1]
let zoom = 100
let oldzoom = 5
let zoomslider


function setup() {
  zoomslider = createSlider(10, 300, 300, 0);
  zoomslider.position(10,10)
  zoomslider.size(windowWidth - 40)
  createCanvas(windowWidth, windowHeight);
  let numCellsx = width
  let numCellsy = height
  cellsx = width / numCellsx;
  cellsy = height / numCellsy;
  noStroke();
  colorMode(HSB, 1, 1, 1)
}


function draw() {
  zoom = zoomslider.value()
  if (zoom != oldzoom) {
    for (let x = 0; x <= width; x += cellsx) {
      for (let y = 0; y <= height; y += cellsy) {
        let altitude = noise(x/zoom, y/zoom)
        if (altitude > DEEPSEA[0] && altitude < DEEPSEA[1]) {
          colour = [0.54, 1, 0.4]
        }
        else if (altitude > SHALLOWSEA[0] && altitude < SHALLOWSEA[1]) {
          colour = [0.54, 1, 0.58]
        }
        else if (altitude > BEACH[0] && altitude < BEACH[1]) {
          colour = [0.1472, 0.55, 1]
        }
        else if (altitude > GRASS[0] && altitude < GRASS[1]) {
          colour = [0.25, 1, 0.5]
        }
        else if (altitude > MOUNTAIN[0] && altitude < MOUNTAIN[1]) {
          colour = [0, 0, 0.5]
        }
        else if (altitude > PEAK[0] && altitude < PEAK[1]) {
          colour = [0, 0, 0.8]
        }
        else {
          colour = [0, 0, 0]
        }
        // colour = [altitude ,1, 1]
        fill(colour)
        rect(x, y, cellsx, cellsy);
      }
    }
  }
  oldzoom = zoom
}

