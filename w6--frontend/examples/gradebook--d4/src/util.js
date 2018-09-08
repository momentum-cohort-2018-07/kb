export function letterGrade (score) {
  if (isNaN(score)) { return '' }

  if (score < 60) {
    return 'F'
  } else if (score < 70) {
    return 'D'
  } else if (score < 80) {
    return 'C'
  } else if (score < 90) {
    return 'B'
  } else {
    return 'A'
  }
}

export function average (list) {
  if (list.length === 0) {
    return null
  }

  return list.reduce((tot, num) => tot + num) / list.length
}
