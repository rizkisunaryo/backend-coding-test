export const numberize = (str, defaultNumber): number => {
  return Number(str) ? Number(str) : defaultNumber
}
