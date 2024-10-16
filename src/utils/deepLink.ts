export const getDeepLink = (path = ''): string => {
  const scheme = 'primepass';
  const prefix = `${scheme}://`;
  return prefix + path;
};

export default getDeepLink;
