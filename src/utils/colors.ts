import { color } from 'csx';

export const colors = {
  primary: {
    get() {
      return color('#222');
    },
    shade1: color('#222').shade(0.2),
  },
  secondary: {
    shade1: color('blue').shade(0.2),
  },
};
