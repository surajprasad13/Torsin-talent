import regex from './regex';

function calculatePrice(percent: number, amount: number) {
  return Math.fround(amount * (percent / 100));
}

export {regex, calculatePrice};
