import chalk from "chalk";
import { ValueNoise } from "value-noise-js";

class Map {
    constructor(width, height, name = "Map") {
        this.name = name;
        this.width = width;
        this.height = height;
        this.map = [];
    }
    fill(type, paramA, paramB) {
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
                        row.push(paramA);
                    }
                    this.map.push(row);
                }
                break;
            case "perlin":
                let zoom = paramA
                let seed = new ValueNoise(paramB);
                for (let i = 0; i < this.height; i++) {
                    let row = [];
                    for (let j = 0; j < this.width; j++) {
                        row.push(Math.floor(seed.evalXY(j * zoom, i * zoom) * 100));
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

function contrast(mapIn, newName) {
    temp = screen(mapIn, mapIn);
    temp2 = multiply(temp, temp, newName);
    return temp2;
}

function insert(symbol, map, rowI, columnJ) {
    
}

function threshold(mapIn, threshold = 100, newName) {
    let temp = new Map(mapIn.width, mapIn.height, newName);
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

function multiply(mapA, mapB, newName) {
    let temp = new Map(mapA.width, mapB.height, newName);
    for (let i = 0; i < mapA.height; i++) {
        let row = [];
        for (let j = 0; j < mapA.width; j++) {
            row.push( Math.floor(mapA.map[i][j] * mapB.map[i][j] * 0.01 ) );
        }
        temp.map.push(row);
    }
    return temp;
}

function screen(mapA, mapB, newName) {
    let temp = new Map(mapA.width, mapA.height, newName);
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

export { contrast, insert, threshold, multiply, screen};
export { Map };