/**
 * Dot notation to object conversion. Takes any object as first argument and uses the string dot notation from the
 * second argument (i.e. 'a.child.node') to access that given object value.
 *
 * @param {any} obj Object to be accessed by dot notation
 * @param {string} dot Dot notation string to extract object data
 * @returns
 */
const dotobject = (obj: any, dot: string) => {
  const rec = (obj: any, dot: string[]): any => {
    if (dot.length && typeof obj[dot[0]] !== 'undefined') {
      return rec(obj[dot[0]], dot.slice(1))
    }
    return obj
  }

  return rec(obj, dot.split('.'))
}

export default dotobject
