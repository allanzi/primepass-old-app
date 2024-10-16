export function CapitalizeWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function Capitalize(text: string): string {
  const words = text.split(' ');
  const wordsCap = words.map((word) => {
    let cap = true;
    if ((word.length === 2) && (word.charAt(1) !== '.')) {
      cap = false;
    }
    if (cap) {
      return CapitalizeWord(word);
    }
    return word;
  });
  return wordsCap.join(' ');
}
