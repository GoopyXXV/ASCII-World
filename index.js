import { Map } from "./maps.js";
import { Contrast } from "./maps.js";
import { Threshold } from "./maps.js";
import { Multiply } from "./maps.js";
import { Screen } from "./maps.js";

const DETROIT = new Map("Detroit", 5, 3, 1, "alfalfa");
const MICHIGAN = new Map("Michigan", 5, 3, 0.3, "alfalfa");

DETROIT.fill();
MICHIGAN.fill();

const BLEND = Multiply(DETROIT, MICHIGAN);

DETROIT.display(true, MICHIGAN);

const SCREEN = Screen(DETROIT, MICHIGAN);

BLEND.display(true, SCREEN);