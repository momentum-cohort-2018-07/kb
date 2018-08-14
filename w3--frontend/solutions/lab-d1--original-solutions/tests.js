/* eslint no-undef: "off", no-unused-vars: "off" */

const assert = chai.assert

const grades = {
  indiana: [94, 82, 59, 95, 55, 98, 93, 84, 81, 75],
  nevada: [53, 84, 98, 58, 75, 61, 67, 62, 60, 89],
  drew: [88, 55, 76, 66, 57, 57, 62, 89, 67, 76],
  dorian: [54, 58, 71, 63, 51, 72, 89, 93, 82, 76],
  chase: [59, 72, 52, 76, 45, 54, 63, 57, 68, 37],
  riley: [79, 92, 54, 71, 94, 77, 61, 57, 60, 75],
  kelly: [76, 92, 94, 89, 99, 66, 75, 93, 73, 96],
  allison: [87, 74, 77, 99, 58, 76, 55, 50, 89, 58],
  ryan: [89, 55, 57, 84, 57, 78, 69, 96, 82, 84],
  remy: [93, 96, 91, 99, 89, 97, 94, 77, 95, 82]
}

describe('assignmentScore', function () {
  it('retrieves assignment scores correctly', function () {
    assert.equal(55, assignmentScore(grades, 'ryan', 1))
    assert.equal(75, assignmentScore(grades, 'indiana', 9))
  })
})

describe('assignmentScores', function () {
  it('gets all assignment scores correctly for an assignment', function () {
    assert.deepEqual(
      [82, 84, 55, 58, 72, 92, 92, 74, 55, 96].sort(),
      assignmentScores(grades, 1).sort())
    assert.deepEqual(
      [81, 60, 67, 82, 68, 60, 73, 89, 82, 95].sort(),
      assignmentScores(grades, 8).sort())
  })
})

describe('assignmentScores', function () {
  it('finds the correct average for an assignment', function () {
    assert.closeTo(80, assignmentAverageScore(grades, 3), 0.001)
    assert.closeTo(75.7, assignmentAverageScore(grades, 8), 0.001)
  })
})

describe('studentAverages', function () {
  it('finds the correct average for each student', function () {
    assert.closeTo(91.3, studentAverages(grades)['remy'], 0.001)
    assert.closeTo(70.9, studentAverages(grades)['dorian'], 0.001)
  })
})

describe('letterGrade', function () {
  it('calculates letter grades correctly', function () {
    assert.equal('A', letterGrade(100))
    assert.equal('A', letterGrade(92))
    assert.equal('B', letterGrade(84))
    assert.equal('C', letterGrade(70))
    assert.equal('D', letterGrade(69))
    assert.equal('F', letterGrade(2))
  })
})

describe('finalLetterGrades', function () {
  it('calculates the correct letter grade for each student', function () {
    assert.equal('A', finalLetterGrades(grades)['remy'])
    assert.equal('B', finalLetterGrades(grades)['kelly'])
    assert.equal('B', finalLetterGrades(grades)['indiana'])
    assert.equal('F', finalLetterGrades(grades)['chase'])
  })
})

describe('classAverage', function () {
  it('calculates the class average correctly', function () {
    assert.closeTo(74.68, classAverage(grades), 0.001)
  })
})

describe('topStudents', function () {
  it('calculates the top students', function () {
    assert.deepEqual(['remy', 'kelly', 'indiana'], topStudents(grades, 3))
    assert.deepEqual(['remy', 'kelly', 'indiana', 'ryan', 'allison', 'riley', 'dorian', 'nevada', 'drew', 'chase'], topStudents(grades, 10))
  })
})

describe('passingStudents', function () {
  it('calculates the passing students', function () {
    assert.deepEqual(
      ['remy', 'kelly', 'indiana', 'ryan', 'allison', 'riley', 'dorian', 'nevada', 'drew'].sort(),
      passingStudents(grades).sort()
    )
  })
})
