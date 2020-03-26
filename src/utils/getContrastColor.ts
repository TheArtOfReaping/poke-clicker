import {color, ColorHelper} from 'csx';

export function getContrastColor(c: string) {
    const color1 = color(c);
    return color1.lightness() > 0.5 ? color('#000').toString() : color('#fff').toString();
}