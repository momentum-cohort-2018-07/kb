/* eslint no-undef: "off", no-unused-vars: "off" */

// An example of the grades object:
// const grades = {
//   indiana: [94, 82, 59, 95, 55, 98, 93, 84, 81, 75],
//   nevada:  [53, 84, 98, 58, 75, 61, 67, 62, 60, 89],
//   drew:    [88, 55, 76, 66, 57, 57, 62, 89, 67, 76],
//   dorian:  [54, 58, 71, 63, 51, 72, 89, 93, 82, 76],
//   chase:   [59, 72, 52, 76, 45, 54, 63, 57, 68, 37],
//   riley:   [79, 92, 54, 71, 94, 77, 61, 57, 60, 75],
//   kelly:   [76, 92, 94, 89, 99, 66, 75, 93, 73, 96],
//   allison: [87, 74, 77, 99, 58, 76, 55, 50, 89, 58],
//   ryan:    [89, 55, 57, 84, 57, 78, 69, 96, 82, 84],
//   remy:    [93, 96, 91, 99, 89, 97, 94, 77, 95, 82]
// }

// 1. Create a function called assignmentScore that takes a grades object,
// a student name, and an assignment number, and returns the score for that
// student and assignment.

function assignmentScore (grades, studentName, assignmentNum) {
  return grades[studentName][assignmentNum]
}

// 2. Create a function called assignmentScores that takes a grades object
// and an assignment number and returns all scores for that assignment.

function column (grid, colNum) {
  return grid.map(function (row) {
    return row[colNum]
  })
}

function assignmentScores (grades, assignmentNum) {
  let scores = Object.values(grades)
  return column(scores, assignmentNum)
}

// 3. Create a function called assignmentAverageScore that takes a grades
// object and an assignment number and returns the average score for that assignment.

function sum (nums) {
  return nums.reduce(function (acc, num) {
    return acc + num
  }, 0)
}

function average (nums) {
  return sum(nums) / nums.length
}

function assignmentAverageScore (grades, assignmentNum) {
  let scores = assignmentScores(grades, assignmentNum)
  return average(scores)
}

// 4. Create a function called studentAverages that takes a grades object
// and returns a new object of students and their average score, like this:
// { indiana: 90, nevada: 80, indigo: 83, ... }

function studentAverages (grades) {
  let averages = {}
  // get a list of students
  let students = Object.keys(grades)
  // for each student
  students.forEach(function (student) {
    // look up their scores from the gradebook
    let scores = grades[student]
    // average their scores
    let averageScore = average(scores)
    // put that in a new object
    averages[student] = averageScore
  })
  // return the new object
  return averages
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
  if (score >= 90) {
    return 'A'
  } else if (score >= 80) {
    return 'B'
  } else if (score >= 70) {
    return 'C'
  } else if (score >= 60) {
    return 'D'
  } else {
    return 'F'
  }
}

// 6. Create a function called finalLetterGrades that takes a grades object
// and returns a new object of students and their final letter grade, as
// determined by their average.

function finalLetterGrades (grades) {
  let finalGrades = {}

  let averages = studentAverages(grades)
  // averages looks like { indiana: 90, nevada: 80, indigo: 83, ... }
  let students = Object.keys(averages)
  // loop through the students
  students.forEach(function (student) {
    // replace the average with the letter grade
    finalGrades[student] = letterGrade(averages[student])
  })
  return finalGrades
}

// 7. Create a function called classAverage that takes a grades object and
// returns the average for the entire class.

function classAverage (grades) {
  let averages = Object.values(studentAverages(grades))
  return average(averages)
}

// 8. Create a function called topStudents that takes a grades object and a
// number of students and returns an array of the names of the top N students,
// where N is the number of students you gave to the function.

function topStudents (grades, numStudents) {
  let averages = studentAverages(grades)
  // averages looks like { indiana: 90, nevada: 80, indigo: 83 }

  // get array of student names
  let students = Object.keys(averages)

  // sort student names by average
  students.sort(function (studentA, studentB) {
    return averages[studentB] - averages[studentA]
  })

  // take only the first numStudents of student names
  // return those student names
  if (numStudents === undefined) {
    return students
  } else {
    return students.slice(0, numStudents)
  }
}

// 9. Create a function called passingStudents that takes a grades object
// and returns an array of all the students with a D or better average.

function passingStudents (grades) {
  let finalGrades = finalLetterGrades(grades)
  let students = Object.keys(finalGrades)

  return students.filter(function (student) {
    return finalGrades[student] !== 'F'
  })
}
