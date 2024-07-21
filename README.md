# ASCII World Map Maker

Makes a colored ASCII random fantasy world map

## Functionality

Currently the program can generate a table of colored ASCII characters with a specified width, height, and generation method. Generation methods include **perlin noise** (of which the scale and seed can be inputted), a black-to-white **gradient**, black-to-white horizontal and vertical **reflected gradients**, and **monocolored** (the color can be specified).

Additionally, maps can be filled with the blended output of two other maps. Current blend modes are **"multiply"** and **"screen."**

The maps can be displayed in the console with **.display()** or **.log()**. The former will create the colored ASCII art, and can optionally display a second map next to it to make visual comparisons easier. The latter will log the values of the map, row by row. This is useful for debugging.

## Tricks

- By recursively using the screen blend mode, contrast can be added to the map. This is made easier with the **Contrast** function.

- By multiplying a horizontal and vertical reflected gradient together, a **vignette** map can be made. The vignette can be constricted or widened by multiplying it or screening it against itself.

## Planned Features

- Create humidity & temperature maps, determine climate based off the compared values

- Implement *rain shadow* by using an emboss filter (or something similar) to affect the humidity map

- Function to insert a specified symbol at any (x, y) coordinate

***

*This is a project I started at work, but now has become a personal project. I don't quite get how Git or GitHub work* totally *yet, so that's why I didn't create a fork of my original project, and just downloaded the .ZIP of the old code and started over.*