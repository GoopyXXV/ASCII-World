import chalk from "chalk";
import { ValueNoise } from "value-noise-js";

class Map {
    constructor(width, height, zoom, seed) {
        this.map = [];
        this.asciiMap = [];
        this.noise = new ValueNoise(seed);
        this.width = width;
        this.height = height;
        this.zoom = zoom;
    }

    // Methods
    fillRow(rowIndex) {
        let row = [];
        for (let i = 0; i < this.width; i++) {
            row.push( Math.floor( this.noise.evalXY(i * this.zoom, rowIndex * this.zoom) * 100 ) );
        }
        return row;
    }

    fill() {
        for (let i = 0; i < this.height; i++) {
            this.map.push(this.fillRow(i));
        }
    }

    fillAsciiRow(rowIndex) {
        let row = [];
        for (let i = 0; i < this.width; i++) {
            let value = Math.floor( this.noise.evalXY(i * this.zoom, rowIndex * this.zoom) * 100 );
            if (value >= 90) {
                row.push("&");
            } else if (value >= 80) {
                row.push("$");
            } else if (value >= 70) {
                row.push("X");
            } else if (value >= 60) {
                row.push("x");
            } else if (value >= 50) {
                row.push("=");
            } else if (value >= 40) {
                row.push("+");
            } else if (value >= 30) {
                row.push(";");
            } else if (value >= 20) {
                row.push(":");
            } else if (value >= 10) {
                row.push(".");
            } else if (value >= 0) {
                row.push(" ");
            } else {
                row.push("?");
            }
        }
        return row;
    }

    fillAscii() {
        for (let i = 0; i < this.height; i++) {
            this.asciiMap.push(this.fillAsciiRow(i));
        }
    }

    log() {
        for (let i = 0; i < this.asciiMap.length; i++) {
            console.log(this.asciiMap[i].join(""));
        }
    }
}

let w = 80;
let h = 20;

let humidity = new Map(w, h, 0.2, "");
humidity.fill();
humidity.fillAscii();
// humidity.log();

let temperature = new Map(w, h, 0.2, "");
temperature.fill();
temperature.fillAscii();
// temperature.log();

function biomeRow(rowIndex) {
    let unicorn = [];
    for (let i = 0; i < w; i++) {
        if (humidity.map[rowIndex][i] >= 66) {
            if (temperature.map[rowIndex][i] >= 66) {
                unicorn.push(chalk.bgYellow.yellow(" "));
            } else if (temperature.map[rowIndex][i] >= 33) {
                unicorn.push(chalk.bgGreen.yellow("▒"));
            } else if (temperature.map[rowIndex][i] >= 0){
                unicorn.push(chalk.bgGreen(" "));
            } else {
                unicorn.push(".");
            }
        } else if (humidity.map[rowIndex][i] >= 33) {
            if (temperature.map[rowIndex][i] >= 66) {
                unicorn.push(chalk.bgRed.yellow("▒"));
            } else if (temperature.map[rowIndex][i] >= 33) {
                unicorn.push(chalk.bgBlack.yellow("▒"));
            } else if (temperature.map[rowIndex][i] >= 0){
                unicorn.push(chalk.bgBlack.green("▒"));
            } else {
                unicorn.push("!");
            }
        } else if (humidity.map[rowIndex][i] >= 0) {
            if (temperature.map[rowIndex][i] >= 66) {
                unicorn.push(chalk.bgRed(" "));
            } else if (temperature.map[rowIndex][i] >= 33) {
                unicorn.push(chalk.bgRed.red("▒"));
            } else if (temperature.map[rowIndex][i] >= 0){
                unicorn.push(chalk.bgBlack(" "));
            } else {
                unicorn.push("?");
            }
        } else {
            unicorn.push("x");
        }
    }
    return unicorn;
}

let biomes = [];

function biomeMap() {
    for (let i = 0; i < h; i++) {
        biomes.push(biomeRow(i));
    }
}

biomeMap();

for (let i = 0; i < biomes.length; i++) {
    console.log(biomes[i].join(""));
}