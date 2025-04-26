/**
 * Converts milliSeconds(ms) to seconds(s) and transforms the result to a string
 * @param {number} milliSeconds milliseconds for converting to seconds
 * @returns {string} string of seconds
 */
export function convertMStoSStoString (milliSeconds) {
  const negativeNum = milliSeconds < 0
  if (negativeNum) milliSeconds *= -1

  const ms = milliSeconds % 1000
  const ss = (milliSeconds - ms) / 1000
  const msFormated =
      ms < 100
        ? ms < 10
          ? `00${ms}`
          : `0${ms}`
        : `${ms}`
  return negativeNum ? `-${ss}.${msFormated}s` : `${ss}.${msFormated}s`
}
