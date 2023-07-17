import regex from './regex';

function calculatePrice(percent: number, amount: number) {
  return Math.fround(amount * (percent / 100));
}

function grandTotal(
  rate: number | string,
  duration: number | string,
  percent: number | string,
) {
  const principal = Number(rate) * Number(duration);
  const interest = Number(percent) / 100;

  return principal - principal * interest;
}

function interestAmount(
  rate: number | string,
  duration: number | string,
  percent: number | string,
) {
  const principal = Number(rate) * Number(duration);
  const interest = Number(percent) / 100;
  return principal * interest;
}

export {regex, calculatePrice, grandTotal, interestAmount};
