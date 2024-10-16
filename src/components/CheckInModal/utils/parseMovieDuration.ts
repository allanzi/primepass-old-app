export default (duration: any) => {
  const minutes = Number(duration);
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  const textoHoras = `${hours}`.slice(-2);
  const textoMinutos = `  ${min}`.slice(-2);

  if (textoHoras === '0') {
    return `${textoMinutos}m`;
  }
  return `${textoHoras}h ${textoMinutos}m`;
};
