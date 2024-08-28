export const dateString = (date) => {
    return date.toISOString().split('T')[0]
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