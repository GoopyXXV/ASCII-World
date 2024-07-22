import { Map } from "./maps.js";
import { Contrast } from "./maps.js";
import { Threshold } from "./maps.js";
import { Multiply } from "./maps.js";
import { Screen } from "./maps.js";

const DETROIT = new Map("Detroit", 10, 5);

DETROIT.fill("gradient");

const MICHIGAN = new Map("Michigan", 10, 5)

MICHIGAN.fill("gradient2");

DETROIT.display(true, MICHIGAN);