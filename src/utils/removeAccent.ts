/* eslint-disable no-plusplus */
export function removeAccent(texto: string): string {
  const comAcento = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ';
  const semAcento = 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr';

  if (!texto) return texto;

  let novastr = '';
  for (let i = 0; i < texto.length; i++) {
    let troca = false;
    for (let a = 0; a < comAcento.length; a++) {
      if (texto.substr(i, 1) === comAcento.substr(a, 1)) {
        novastr += semAcento.substr(a, 1);
        troca = true;
        break;
      }
    }
    if (troca === false) {
      novastr += texto.substr(i, 1);
    }
  }
  return novastr;
}

export default removeAccent;
