export function phoneUnFormat(phoneNumber: string): string {
  return `${phoneNumber}`.replace(/\D/g, '');
}

export function phoneFormat(phoneNumber: string): string {
  const cleaned = phoneUnFormat(phoneNumber);
  const match: RegExpMatchArray | null = cleaned.length === 13
    ? cleaned.match(/^(55|)?(\d{2})(\d{5})(\d{4})$/)
    : cleaned.match(/^(55|)?(\d{2})(\d{4})(\d{4})$/);
  if (match) {
    return ['(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return phoneNumber;
}
