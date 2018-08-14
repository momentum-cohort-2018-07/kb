/* eslint no-undef: "off", no-unused-vars: "off" */

// An example of the grades object:
// const grades = {
//   indiana: [94, 82, 59, 95, 55, 98, 93, 84, 81, 75],
//   nevada: [53, 84, 98, 58, 75, 61, 67, 62, 60, 89],
//   drew: [88, 55, 76, 66, 57, 57, 62, 89, 67, 76],
//   dorian: [54, 58, 71, 63, 51, 72, 89, 93, 82, 76],
//   chase: [59, 72, 52, 76, 45, 54, 63, 57, 68, 37],
//   riley: [79, 92, 54, 71, 94, 77, 61, 57, 60, 75],
//   kelly: [76, 92, 94, 89, 99, 66, 75, 93, 73, 96],
//   allison: [87, 74, 77, 99, 58, 76, 55, 50, 89, 58],
//   ryan: [89, 55, 57, 84, 57, 78, 69, 96, 82, 84],
//   remy: [93, 96, 91, 99, 89, 97, 94, 77, 95, 82]
// }

// 1. Create a function called assignmentScore that takes a grades object,
// a student name, and an assignment number, and returns the score for that
// student and assignment.

function assignmentScore (grades, studentName, assignmentNum) {
  return grades[studentName][assignmentNum]
}

// 2. Create a function called assignmentScores that takes a grades object
// and an assignment number and returns all scores for that assignment.

function assignmentScores (grades, assignmentNum) {
  return Object.values(grades).map(function (gs) {
    return gs[assignmentNum]
  })
}

// 3. Create a function called assignmentAverageScore that takes a grades
// object and an assignment number and returns the average score for that assignment.

function average (xs) {
  if (xs.length === 0) {
    return
  }

  return xs.reduce(function (total, x) {
    return total + x
  }) / xs.length
}

function assignmentAverageScore (grades, assignmentNum) {
  return average(assignmentScores(grades, assignmentNum))
}

// 4. Create a function called studentAverages that takes a grades object
// and returns a new object of students and their average score, like this:
// { indiana: 90, nevada: 80, indigo: 83, ... }

function studentAverages (grades) {
  let students = Object.keys(grades)

  return students.reduce(function (averages, student) {
    averages[student] = average(grades[student])
    return averages
  }, {})
}

// 5. Create a function called letterGrade that returns a letter grade for a
// numerical score. The second number is non-inclusive. For example, 90 is an 'A',
// 89.9 is a 'B'.
// 90+ => A
// 80-90 => B
// 70-80 => C
// 60-70 => D
// < 60 => F

function letterGrade (score) {
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

// 6. Create a function called finalLetterGrades that takes a grades object
// and returns a new object of students and their final letter grade, as
// determined by their average.

function finalLetterGrades (grades) {
  let averages = studentAverages(grades)
  for (let student in averages) {
    averages[student] = letterGrade(averages[student])
  }
  return averages
}

// 7. Create a function called classAverage that takes a grades object and
// returns the average for the entire class.

function classAverage (grades) {
  return average(Object.values(studentAverages(grades)))
}

// 8. Create a function called topStudents that takes a grades object and a
// number of students and returns an array of the names of the top N students,
// where N is the number of students you gave to the function.

function topStudents (grades, numStudents) {
  let averages = studentAverages(grades)
  let sortedStudents = Object.keys(averages).sort(function (a, b) {
    return averages[b] - averages[a]
  })
  return sortedStudents.slice(0, numStudents)
}

// 9. Create a function called passingStudents that takes a grades object
// and returns an array of all the students with a D or better average.

function passingStudents (grades) {
  let studentGrades = finalLetterGrades(grades)
  return Object.keys(studentGrades).filter(function (student) {
    return studentGrades[student] !== 'F'
  })
}
