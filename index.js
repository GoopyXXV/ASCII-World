import { Map } from "./maps.js";
import { Contrast } from "./maps.js";
import { Threshold } from "./maps.js";

const A = new Map("Tom", 20, 15, 0.5, "abcdefg");
A.fill();

const B = Threshold(A, 50, "Brady");

A.display(true, B);