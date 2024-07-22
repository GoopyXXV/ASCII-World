import chalk from "chalk";
import { ValueNoise } from "value-noise-js";

export class Map {
    constructor(name = "Map", width, height, zoom = 1, seed = "") {
        this.name = name;
        this.map = [];
        this.noise = new ValueNoise(seed);
        this.width = width;
        this.height = height;
        this.zoom = zoom;
    }
    fill(type, fillPercent, ) {
        switch(type) {
            case "vertical gradient":
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        row.push((100 / this.height) * i);
                    }
                    this.map.push(row);
                }
                break;
            case "reverse vertical gradient":
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        row.push((100 / this.height) * i);
                    }
                    this.map.unshift(row);
                }
                break;
            case "horizontal gradient":
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        row.push((100 / this.width) * j);
                    }
                    this.map.push(row);
                }
                break;
            case "reverse horizontal gradient":
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        row.unshift((100 / this.width) * j);
                    }
                    this.map.push(row);
                }
                break;
            case "horizontal reflected gradient":
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        if (j < this.width / 2) {
                            row.push((100 / Math.floor(this.width / 2)) * j);
                        } else {
                            row.push(row[Math.abs(j - this.width) - 1]);
                        }
                    }
                    this.map.push(row);
                }
                break;
            case "reverse horizontal reflected gradient":
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        if (j < this.width / 2) {
                            row.unshift((100 / Math.floor(this.width / 2)) * j);
                        } else {
                            row.push(row[Math.abs(j - this.width) - 1]);
                        }
                    }
                    this.map.push(row);
                }
                break;
            case "vertical reflected gradient":
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    if (i < this.height / 2) {
                        for (let j = 0; j < this.width; j++) {
                            row.push((100 / Math.floor(this.height / 2)) * i);
                        }
                    } else {
                        for (let j = 0; j < this.width; j++) {
                            row.push(this.map[Math.abs(i - this.height)-1][j]);
                        }
                    }
                    this.map.push(row);
                }
                break;
            case "reverse vertical reflected gradient":
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    if (i < this.height / 2) {
                        for (let j = 0; j < this.width; j++) {
                            row.push((100 / Math.floor(this.height / 2)) * i);
                        }
                    } else {
                        for (let j = 0; j < this.width; j++) {
                            row.push(this.map[Math.abs(i - this.height)-1][j]);
                        }
                    }
                    if (i <= this.height / 2) {
                        this.map.unshift(row);
                    } else {
                        this.map.push(row);
                    }
                }
                break;
            case "fill":
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        row.push(fillPercent);
                    }
                    this.map.push(row);
                }
                break;
            case "perlin":
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        row.push(Math.floor(this.noise.evalXY(j * this.zoom, i * this.zoom) * 100));
                    }
                    this.map.push(row);
                }
                break;
            default:
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        row.push(Math.random() * 100);
                    }
                    this.map.push(row);
                }
        }
    }
    log() {
        console.log("\n" + this.name + " Log");
        for (let i = 0; i < this.map.length; i++) {
            console.log(`Row (${i}): ` + this.map[i].join(", "));
        }
    }
    display(compareBool = false, compareTo) {
        let displayMapA = [];
        let displayMapB = [];
        switch(compareBool) {
            case true:
                for (let i = 0; i < this.height; i++) {
                    let rowA = [];
                    let rowB = [];
                    for (let j = 0; j < this.width; j++) {
                        let x = Math.floor(this.map[i][j] * 2.55);
                        rowA.push(chalk.bgRgb(x, x, x)(" "));

                        let y = Math.floor(compareTo.map[i][j] * 2.55);
                        rowB.push(chalk.bgRgb(y, y, y)(" "));
                    }
                    displayMapA.push(rowA);
                    displayMapB.push(rowB);
                }
                console.log(this.name + " vs. " + compareTo.name);
                for (let i = 0; i < displayMapA.length; i++) {
                    console.log((displayMapA[i].join("")) + " " + (displayMapB[i].join("")));
                }
                break;
            default:
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        let x = Math.floor(this.map[i][j] * 2.55);
                        row.push(chalk.bgRgb(x, x, x)(" "));
                    }
                    displayMapA.push(row);
                }
                console.log(this.name);
                for (let i = 0; i < displayMapA.length; i++) {
                    console.log(displayMapA[i].join(""));
                }
        }
    }
}

export function Contrast(mapIn, newName) {
    let temp = new Map(newName, mapIn.width, mapIn.height);
    temp.fill("screen", mapIn, mapIn);
    let temp2 = new Map(newName, mapIn.width, mapIn.height);
    temp2.fill("multiply", temp, temp);
    return temp2;
}

export function Insert(symbol, map, rowI, columnJ) {
    
}

export function Threshold(mapIn, threshold = 100, newName) {
    let temp = new Map(newName, mapIn.width, mapIn.height);
    for (let i = 0; i < mapIn.height; i++) {
        let row = [];
        for (let j = 0; j < mapIn.width; j++) {
            if (mapIn.map[i][j] >= threshold) {
                row.push(100);
            } else {
                row.push(0);
            }
        }
        temp.map.push(row);
    }
    return temp;
}

export function Multiply(mapA, mapB) {
    let temp = new Map(`${mapA.name}*${mapB.name}`, mapA.width, mapB.height);
    for (let i = 0; i < mapA.height; i++) {
        let row = [];
        for (let j = 0; j < mapA.width; j++) {
            row.push( Math.floor(mapA.map[i][j] * mapB.map[i][j] * 0.01 ) );
        }
        temp.map.push(row);
    }
    return temp;
}

export function Screen(mapA, mapB) {
    let temp = new Map(`${mapA.name}/${mapB.name}`, mapA.width, mapA.height);
    for (let i = 0; i < mapA.height; i++) {
        let row = [];
        for (let j = 0; j < mapA.width; j++) {
            let a = mapA.map[i][j] * 0.01;
            let b = mapB.map[i][j] * 0.01;
            let value = 1 - ( ( 1 - a ) * ( 1 - b ) );
            row.push(Math.floor(value * 100));
        }
        temp.map.push(row);
    }
    return temp;
}