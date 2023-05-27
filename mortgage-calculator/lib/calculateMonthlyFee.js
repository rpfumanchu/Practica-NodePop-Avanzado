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
  let tasaInteres =
    (useEuribor
      ? parseFloat(euriborValue) + parseFloat(rate)
      : parseFloat(rate)) /
    100 /
    12;
  const plazoMeses = parseInt(term) * 12;

  // let rateFloat = parseFloat(rate) / 100 / 12;
  // const monthlyTerm = parseInt(term) * 12;

  //NOTE Convertir el valor del Euríbor a decimal
  // if (useEuribor) {
  //   const euribor = parseFloat(euriborValue) / 100;
  //   tasaInteres += euribor;
  // }

  const share =
    (capitalFloat * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -plazoMeses));

  console.log("A", capitalFloat, tasaInteres, plazoMeses, share);

  // const euriborFloat = () + rateFloat;
  // // //NOTE Ajuste mensual basado en el Euríbor (proporcionado como porcentaje)
  // // const euriborAdjustment = capitalFloat * euriborFloat * rateFloat;

  // // //NOTE Sumar el valor del Euríbor a la tasa de interés
  // // share += euriborAdjustment;

  // console.log("A", euriborFloat, share, rateFloat);

  // share =
  //   (capitalFloat * euriborFloat) /
  //   (1 - Math.pow(1 + rateFloat, -monthlyTerm));

  // }

  //NOTE Redondear a 2 decimales
  return share.toFixed(2);
}

module.exports = calculateMonthlyFee;
