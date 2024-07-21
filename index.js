import chalk from "chalk";
import { ValueNoise } from "value-noise-js";

// Custom hex colors
// Hues
const RED       = "#FF0000";
const ORANGE    = "#FF8000";
const YELLOW    = "#FFFF00";
const CHRTRS    = "#80FF00";
const GREEN     = "#00FF00";
const SPRING    = "#00FF80";
const CYAN      = "#00FFFF";
const CRLN      = "#0080FF";
const BLUE      = "#0000FF";
const PURPLE    = "#8000FF";
const MAGENTA   = "#FF00FF";
const ROSE      = "#FF0080";

// SHADES
const SCRLT     = "#800000";
const OLIVE     = "#808000";
const FOREST    = "#008000";
const TEAL      = "#008080";
const NAVY      = "#000080";
const DMAG      = "#800080";

// TINTS
const PINK      = "#FF8080";
const CNRY      = "#FFFF80";
const MINT      = "#80FF80";
const SKY       = "#80FFFF";
const LBLUE     = "#8080FF";
const LMAG      = "#FF80FF";

// TONES
const BLACK     = "#000000";
const GRAY      = "#808080";
const WHITE     = "#FFFFFF";

const W = 40;
const H = 20;

class Map {
    constructor(name = "Map", width, height, zoom = 1, seed = "") {
        this.name = name;
        this.map = [];
        this.noise = new ValueNoise(seed);
        this.width = width;
        this.height = height;
        this.zoom = zoom;
    }
    fill(blendMode, layer0, layer1, fillPercent, ) {
        switch(blendMode) {
            case "normal":
                this.blendMode = "normal";
                for (let j = 0; j < this.height; j++) {
                    let row = [];
                    for (let i = 0; i < this.width; i++) {
                        row.push(layer0.map[j][i]);
                    }
                    this.map.push(row);
                }
                break;
            case "multiply":
                this.blendMode = "multiply";
                for (let j = 0; j < this.height; j++) {
                    let row = [];
                    for (let i = 0; i < this.width; i++) {
                        row.push( Math.floor(layer1.map[j][i] * layer0.map[j][i] * 0.01) );
                    }
                    this.map.push(row);
                }
                break;
            case "screen":
                this.blendMode = "screen";
                for (let j = 0; j < this.height; j++) {
                    let row = [];
                    for (let i = 0; i < this.width; i++) {
                        let a = layer0.map[j][i] * 0.01;
                        let b = layer1.map[j][i] * 0.01;
                        let value = 1 - ( ( 1 - a ) * ( 1 - b ) );
                        row.push(Math.floor(value * 100));
                    }
                    this.map.push(row);
                }
                break;
            case "gradient":
                for (let j = 0; j < this.height; j++) {
                    let row = [];
                    for (let i = 0; i < this.width; i++) {
                        row.push((100 / this.height) * j);
                    }
                    this.map.push(row);
                }
                break;
            case "reflected":
                for (let j = 0; j < this.height; j++) {
                    let row = [];
                    if (j < this.height / 2) {
                        for (let i = 0; i < this.width; i++) {
                            row.push((100 / (this.height / 2)) * j);
                        }
                    } else {
                        for (let i = 0; i < this.width; i++) {
                            row.push(this.map[Math.abs(j - this.height)-1][i]);
                        }
                    }
                    this.map.push(row);
                }
                break;
            case "fill":
                for (let j = 0; j < this.height; j++) {
                    let row = [];
                    for (let i = 0; i < this.width; i++) {
                        row.push(fillPercent);
                    }
                    this.map.push(row);
                }
                break;
            default:
                for (let j = 0; j < this.height; j++) {
                    let row = [];
                    for (let i = 0; i < this.width; i++) {
                        row.push(Math.floor(this.noise.evalXY(i * this.zoom, j * this.zoom) * 100));
                    }
                    this.map.push(row);
                }
        }
    }
    log() {
        console.log("\n" + this.name + " Log");
        for (let j = 0; j < this.map.length; j++) {
            console.log(`Row (${j}): ` + this.map[j].join(", "));
        }
    }
    display(compareBool = false, compareTo) {
        let displayMapA = [];
        let displayMapB = [];
        switch(compareBool) {
            case true:
                for (let j = 0; j < this.height; j++) {
                    let rowA = [];
                    let rowB = [];
                    for (let i = 0; i < this.width; i++) {
                        let x = Math.floor(this.map[j][i] * 2.55);
                        rowA.push(chalk.bgRgb(x, x, x)(" "));

                        let y = Math.floor(compareTo.map[j][i] * 2.55);
                        rowB.push(chalk.bgRgb(y, y, y)(" "));
                    }
                    displayMapA.push(rowA);
                    displayMapB.push(rowB);
                }
                console.log(this.name + " vs. " + compareTo.name);
                for (let j = 0; j < displayMapA.length; j++) {
                    console.log((displayMapA[j].join("")) + " " + (displayMapB[j].join("")));
                }
                break;
            default:
                for (let j = 0; j < this.height; j++) {
                    let row = [];
                    for (let i = 0; i < this.width; i++) {
                        let x = Math.floor(this.map[j][i] * 2.55);
                        row.push(chalk.bgRgb(x, x, x)(" "));
                    }
                    displayMapA.push(row);
                }
                console.log(this.name);
                for (let j = 0; j < displayMapA.length; j++) {
                    console.log(displayMapA[j].join(""));
                }
        }
    }
}
