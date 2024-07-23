import * as world from "./world.js";
import { Map } from "./world.js";
import chalk from "chalk";

const W = 150;
const ASPECT_RATIO = 2; // x:1
const HUM_ZOOM = 0.25;

// Commented values are for W = 150
const SEA_LVL = 15;           // const SEA_LVL = 18;
const MTN_LVL = 50;
const ELEV_A_ZOOM = W * 3.333e-4;   // const ELEV_MASK_ZOOM = 0.05;
const ELEV_B_ZOOM = W * 6.666e-4;   // const ELEV_MASK_2_ZOOM = 0.1;
const ELEV_C_ZOOM = W * 0.001333;   // const ELEV_ZOOM = 0.2;
const H = Math.floor(W / ASPECT_RATIO);

// Elevation
// Broad elevation
const ELEV_A = new Map(W, H);
ELEV_A.fill("perlin", ELEV_A_ZOOM)

// Fine elevation
const ELEV_B = new Map(W, H);
ELEV_B.fill("perlin", ELEV_B_ZOOM);

// Finest elevation
const ELEV_C = new Map(W, H);
ELEV_C.fill("perlin", ELEV_C_ZOOM);

const ELEV_D = world.multiply(world.multiply(ELEV_A, ELEV_B), ELEV_C);

// Bias elevation to be higher near the center of the map
const H_EDGES_A = new Map(W, H);
H_EDGES_A.fill("horizontal reflected gradient");
const H_EDGES_B = world.screen(H_EDGES_A, H_EDGES_A);
const H_EDGES_C = world.screen(H_EDGES_B, H_EDGES_B);

const V_EDGES_A = new Map(W, H);
V_EDGES_A.fill("vertical reflected gradient");
const V_EDGES_B = world.screen(V_EDGES_A, V_EDGES_A);
const V_EDGES_C = world.screen(V_EDGES_B, V_EDGES_B);

const EDGES = world.multiply(H_EDGES_C, V_EDGES_C);

// Combining Elevation and bias
const ELEV_E = world.multiply(ELEV_D, EDGES);
// ELEV_E.display();

const TMPRTR = new Map(W, H, "Temperature");
TMPRTR.fill("vertical reflected gradient");

const HUM = new Map(W, H, "Humidity");
HUM.fill("perlin", HUM_ZOOM);

function overlayMaps(temperature, humidity, elevation) {
    for (let i = 0; i < temperature.height; i++) {
        let row = [];
        for (let j = 0; j < temperature.width; j++) {
            let r = Math.floor(temperature.map[i][j] * 2.55);
            let g = Math.floor(humidity.map[i][j] * 2.55);
            let b = Math.floor(elevation.map[i][j] * 2.55);
            row.push(chalk.bgRgb(r, g, b)(" "));
        }
        console.log(row.join(""));
    }
}

function createClimates(temperature, humidity, elevation, newName) {
    let temp = new Map(temperature.width, temperature.height, newName);
    for (let i = 0; i < temp.height; i++) {
        let row = [];
        for (let j = 0; j < temp.width; j++) {
            let tValue = temperature.map[i][j];
            let hValue = humidity.map[i][j];
            let eValue = elevation.map[i][j];
            row.push(determineClimate(tValue, hValue, eValue));
        }
        temp.map.push(row);
    }
    return temp;
}

function determineClimate(t, h, e) {
    if (e >= MTN_LVL) {
        if (t >= 66) {
            if (h >= 66) {
                let climate = "forest";
                let color = chalk.bgGreen.greenBright("↑");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 33) {
                let climate = "taiga";
                let color = chalk.bgGreen.white("↑");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 0) {
                let climate = "summit";
                let color = chalk.bgGray.white("▲");
                return {climate: climate, color: color, t: t, h: h, e: e};
            }
        } else if (t >= SEA_LVL) {
            if (h >= 66) {
                let climate = "taiga";
                let color = chalk.bgGreen.white("↑");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 33) {
                let climate = "taiga";
                let color = chalk.bgGreen.white("↑");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 0) {
                let climate = "summit";
                let color = chalk.bgGray.white("▲");
                return {climate: climate, color: color, t: t, h: h, e: e};
            }
        } else if (t >= 0) {
            if (h >= 66) {
                let climate = "tundra";
                let color = chalk.bgWhite.gray(".");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 33) {
                let climate = "tundra";
                let color = chalk.bgWhite.gray(".");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 0) {
                let climate = "glacier";
                let color = chalk.bgWhite.whiteBright("▲");
                return {climate: climate, color: color, t: t, h: h, e: e};
            }
        }
    } else if (e >= SEA_LVL) {
        if (t >= 66) {
            if (h >= 66) {
                let climate = "rainforest";
                let color = chalk.bgGreen.greenBright("♣");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 33) {
                let climate = "savanna";
                let color = chalk.bgYellow.green(",");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 0) {
                let climate = "desert";
                let color = chalk.bgYellowBright.yellow(".");
                return {climate: climate, color: color, t: t, h: h, e: e};
            }
        } else if (t >= 33) {
            if (h >= 66) {
                let climate = "beach";
                let color = chalk.bgYellowBright.greenBright("↑");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 33) {
                let climate = "forest";
                let color = chalk.bgGreen.greenBright("↑");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 0) {
                let climate = "grassland";
                let color = chalk.bgGreen.green(",");
                return {climate: climate, color: color, t: t, h: h, e: e};
            }
        } else if (t >= 0) {
            if (h >= 66) {
                let climate = "cold beach";
                let color = chalk.bgGray.white(".");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 33) {
                let climate = "swamp";
                let color = chalk.bgGreen.blue("&");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 0) {
                let climate = "tundra";
                let color = chalk.bgWhite.gray(".");
                return {climate: climate, color: color, t: t, h: h, e: e};
            }
        }
    } else if (e >= 0) {
        if (t >= 66) {
            if (h >= 66) {
                let climate = "reef";
                let color = chalk.bgCyan.cyanBright("~");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 33) {
                let climate = "warm ocean";
                let color = chalk.bgBlueBright.cyan("~");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 0) {
                let climate = "warm ocean";
                let color = chalk.bgBlueBright.cyan("~");
                return {climate: climate, color: color, t: t, h: h, e: e};
            }
        } else if (t >= 33) {
            if (h >= 66) {
                let climate = "ocean";
                let color = chalk.bgBlueBright(" ");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 33) {
                let climate = "ocean";
                let color = chalk.bgBlueBright(" ");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 0) {
                let climate = "ocean";
                let color = chalk.bgBlueBright(" ");
                return {climate: climate, color: color, t: t, h: h, e: e};
            }
        } else if (t >= 0) {
            if (h >= 66) {
                let climate = "cold ocean";
                let color = chalk.bgBlue(" ");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 33) {
                let climate = "cold ocean";
                let color = chalk.bgBlue(" ");
                return {climate: climate, color: color, t: t, h: h, e: e};
            } else if (h >= 0) {
                let climate = "ice burg";
                let color = chalk.bgBlue.white("~");
                return {climate: climate, color: color, t: t, h: h, e: e};
            }
        }
    }
}

function displayClimates(mapIn) {
    for (let i = 0; i < mapIn.height; i++) {
        let row = [];
        for (let j = 0; j < mapIn.width; j++) {
            row.push(mapIn.map[i][j].color);
        }
        console.log(row.join(""));
    }
}

// Show results
const WORLD = createClimates(TMPRTR, HUM, ELEV_E);

displayClimates(WORLD);