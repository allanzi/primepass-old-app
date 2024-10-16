/* eslint-disable no-plusplus */
interface MaskProps {
  value: string;
  pattern: string;
}

export default function mask({ value, pattern }: MaskProps): string {
  let index = 0;
  return pattern.replace(/#/g, () => value[index++] || '');
}
