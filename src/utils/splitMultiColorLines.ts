/* eslint-disable no-plusplus */
export interface TextLinesPrarams {
  id: string,
  text: string,
  type: string,
  color: string,
  weight: string,
}

export default function splitMultiColorLines(
  baseColor: string,
  text: string,
): Array<TextLinesPrarams> {
  const retLines:Array<TextLinesPrarams> = [];
  let retIdx = -1;
  let posIni = 0;
  let posFim = 1;
  let lineId:string;
  let lineType = 'inline';
  let lineColor = baseColor;
  let lineWeight = 'normal';
  let lineText = '';
  let begin = true;
  let i = 0;
  let line = 0;

  for (i = 0; i < text.length; i++) {
    begin = true;
    const char = text[i];
    if (char === '{' || char === '[') {
      posFim = i;
      lineText = text.substring(posIni, posFim);
      lineId = `txtLin${++line}`;
      retLines[++retIdx] = {
        id: lineId,
        text: lineText,
        type: lineType,
        color: lineColor,
        weight: lineWeight,
      };
      lineType = (char === '{' ? 'inline' : 'newline');
      posIni = i + 1;
    }

    if (char === '}' || char === ']') {
      posFim = i;
      lineId = `txtLin${++line}`;
      lineText = text.substring(posIni, posFim);
      const splitText = lineText.split(';');
      lineColor = splitText.length === 1 ? baseColor : splitText[0];
      lineWeight = (splitText.length === 2 ? 'normal' : splitText[1]);
      lineText = (splitText.length === 2 ? splitText[1] : splitText[2]);
      if (splitText.length === 1) {
        const [point] = splitText;
        lineText = point;
        lineWeight = 'normal';
      }

      retLines[++retIdx] = {
        id: lineId,
        text: lineText,
        type: lineType,
        color: lineColor,
        weight: lineWeight,
      };
      posIni = i + 1;
      posFim = posIni;
      lineColor = baseColor;
      lineWeight = 'normal';
      lineType = 'inline';
      begin = false;
    }
  }

  if (begin) {
    posFim = i;
    lineId = `txtLin${++line}`;
    lineText = text.substring(posIni, posFim);
    retLines[++retIdx] = {
      id: lineId,
      text: lineText,
      type: lineType,
      color: lineColor,
      weight: lineWeight,
    };
  }

  return retLines;
}
