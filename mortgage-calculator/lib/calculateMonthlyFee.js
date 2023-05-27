//DONE Función para calcular la cuota mensual de la hipoteca

function calculateMonthlyFee(
  capital,
  rate,
  term,
  useEuribor = false,
  euriborValue = 0,
) {
  const capitalFloat = parseFloat(capital);

  //NOTE tasa mensual (dividida por 12)
  let rateFloat =
    (useEuribor
      ? parseFloat(euriborValue) + parseFloat(rate)
      : parseFloat(rate)) /
    100 /
    12;
  const monthlyTerm = parseInt(term) * 12;

  const share =
    (capitalFloat * rateFloat) / (1 - Math.pow(1 + rateFloat, -monthlyTerm));

  //NOTE Redondear a 2 decimales

  return share.toFixed(2);
}

module.exports = calculateMonthlyFee;
