# ASCII World Map Maker

Makes a colored ASCII random fantasy world map

## Functionality

Currently the program can generate a table of colored ASCII characters with a specified width, height, and generation method. Generation methods include **perlin noise** (of which the scale and seed can be inputted), a black-to-white **gradient**, black-to-white horizontal and vertical **reflected gradients**, and **monocolored** (the color can be specified).

The maps can be displayed in the console with **.display()** or **.log()**. The former will create the colored ASCII art, and can optionally display a second map next to it to make visual comparisons easier. The latter will log the values of the map, row by row. This is useful for debugging.

## Class Methods & Functions

### Methods

- **Fill Normal:** I don't know why this is useful, but I thought I'd add it anyway since it's easy. It takes an inputted Map and replaces itself with it.

- **Fill Multiply:** Generates its map by multiplying two other maps together. (White is the alpha)

- **Fill Screen:** Generates its map by screening two other maps together. (Black is the alpha).

- **Fill Gradient:** Fills its map with a black-to-white gradient (top to bottom).

- **Fill Reflected:** Fills its map halfway with a black-to-white gradient, then copies the rows in reverse order to the next row.

- **Fill Reflected2:** Fills its map with a reflected gradient, like above, but rotated 90°.

- **Fill Fill:** Fills its map with a specified value.

- **Log:** Logs each row of the specified map to the console.

- **Display:** Logs each row of the specified map to the console, interpreting each index's value as an RGB value.

- **Display Compare:** Displays the map and another next to eachother.

### Functions

- **Contast:** Takes a Map and string as an input. It screens and multiplies the map against itself, and outputs the new map with the inputted string as its name.

- **Threshold:** Takes a Map, threshold value, and string as an input. It compares indices of the map against the threshold, replacing them with white if they are greater than or equal to the threshold. The other indices are replaced with black. Outputs a map with the string as its name.

## Tricks

- By recursively using the screen blend mode, contrast can be added to the map. This is made easier with the **Contrast** function.

- By multiplying a horizontal and vertical reflected gradient together, a **vignette** map can be made. The vignette can be constricted or widened by multiplying it or screening it against itself.

## Planned Features

- White-to-black vertical and horizontal reflected gradients

- Create humidity & temperature maps, determine climate based off the compared values

- Implement *rain shadow* by using an emboss filter (or something similar) to affect the humidity map

- Function to insert a specified symbol at any (x, y) coordinate

- Stretch

***

*This is a project I started at work, but now has become a personal project. I don't quite get how Git or GitHub work* totally *yet, so that's why I didn't create a fork of my original project, and just downloaded the .ZIP of the old code and started over.*

***

*Now I've forked my personal project to my work account...*