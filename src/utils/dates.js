export const dateString = (date) => {
    return [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-')
}
export const oneWeekAgo = () => {
    let d = new Date()
    d.setDate(d.getDate() - 7)
    return d
}

export function startOfMonth() {
    let d = new Date()
    d.setFullYear(d.getFullYear(), d.getMonth(), 1)
    return d
}

export function startOfLastMonth() {
    let d = new Date()
    d.setFullYear(d.getFullYear(), d.getMonth() - 1, 1)
    return d
}

export function endOfLastMonth() {
  let d = new Date()
  d.setFullYear(d.getFullYear(), d.getMonth(), -1)
  return d
}

export function startOfYear() {
    let d = new Date()
    d.setFullYear(d.getFullYear(), 0, 1)
    return d
}

function pad(n) {
    const s = '0' + n
    return s.substring(s.length-2)
}
