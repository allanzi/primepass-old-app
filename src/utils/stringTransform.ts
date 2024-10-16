export const ucFirst = (value: string) => value[0].toUpperCase() + value.slice(1).toLowerCase();

export function firstLetter(name: string) {
  return name.slice(0, 1);
}

export function initialsName(name: string) {
  const namesArray = name.trim().split(' ');
  const firstName = namesArray[0];
  const lastName = namesArray[namesArray.length - 1];

  if (namesArray.length === 0) {
    return 'P';
  }

  if (namesArray.length === 1) {
    return `${firstName.charAt(0)}`;
  }

  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
}

export const isNumeric = (value: any) => !Number.isNaN(value - parseFloat(value));
