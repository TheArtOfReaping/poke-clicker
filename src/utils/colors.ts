import { color } from 'csx';

const primary = '#282c34';
const secondary = '#2bbad6';

export const createPalette = function createPalette(c: string) {
  return {
    get() {
      return color(c).toString();
    },
    shade1: color(c).shade(0.2).toString(),
    shade2: color(c).shade(0.4).toString(),
    shade3: color(c).shade(0.6).toString(),
    shade4: color(c).shade(0.8).toString(),
    tint1: color(c).tint(0.2).toString(),
    tint2: color(c).tint(0.4).toString(),
    tint3: color(c).tint(0.6).toString(),
    tint4: color(c).tint(0.8).toString(),
    complement: color(c).spin(180).toString(),
    inverse: color(c).invert().toString(),
  }
}


export const colors = {
  primary: createPalette(primary),
  secondary: createPalette(secondary),
  pink: createPalette('#f26bbe'),
  green: createPalette('#2bd661'),
  black: createPalette('#000'),
  white: createPalette('#fff'),
};


