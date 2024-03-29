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
        fadeOut1: color(c).fadeOut(0.2).toString(),
        fadeOut2: color(c).fadeOut(0.4).toString(),
        fadeOut3: color(c).fadeOut(0.6).toString(),
        fadeOut4: color(c).fadeOut(0.8).toString(),
        desaturate1: color(c).desaturate(0.2).toString(),
        desaturate2: color(c).desaturate(0.4).toString(),
        desaturate3: color(c).desaturate(0.6).toString(),
        desaturate4: color(c).desaturate(0.8).toString(),
    };
};


export const colors = {
    primary: createPalette(primary),
    secondary: createPalette(secondary),
    pink: createPalette('#f26bbe'),
    green: createPalette('#2bd661'),
    black: createPalette('#000'),
    white: createPalette('#fff'),
    gold: createPalette('#ffe587'),
    red: createPalette('#e33939'),
};


