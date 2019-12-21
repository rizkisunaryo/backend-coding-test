module.exports = {
  numberize: (str, defaultNumber) => {
    return Number(str) ? Number(str) : defaultNumber
  }
}
