var assert = chai.assert;

describe('sum', function () {
  it("returns 0 for an empty array", function () {
    assert.equal(0, sum([]))
  })

  it("works with only one number in the array", function () {
    assert.equal(5, sum([5]))
  })

  it("adds up all the numbers in an array", function () {
    assert.equal(15, sum([1, 2, 3, 4, 5]))
  })
})

describe('average', function () {
  it("returns undefined for an empty array", function () {
    assert.isUndefined(average([]));
  })

  it("works with only one number in the array", function () {
    assert.equal(5, average([5]));
  })

  it("returns the average of an array", function () {
    assert.equal(3, average([1, 2, 3, 4, 5]));
  })
})

describe('intersection', function () {
  it("returns an empty array if there is no intersection", function () {
    assert.deepEqual(
      [],
      intersection([1, 2, 3], [4, 5, 6])
    )
  })

  it("returns the intersection of two arrays", function () {
    assert.deepEqual(
      [12, 3, 9],
      intersection([12, 15, 9, 6, 3, 0], [2, 3, 4, 5, 8, 9, 10, 11, 12]).sort()
    )
  })
})

describe('minimum', function () {
  it("returns undefined for an empty array", function () {
    assert.isUndefined(minimum([]));
  })

  it("returns the number for an array with one number", function () {
    assert.equal(1, minimum([1]));
  })

  it("returns the the minimum number in an array of numbers", function () {
    assert.equal(1, minimum([2, 1, 3]));
    assert.equal(-4, minimum([7, 31, -4, 2]));
  })
})

describe('selectionSort', function () {
  it("returns an empty array for an empty array", function () {
    assert.deepEqual([], selectionSort([]))
  })

  it("returns the same array for an array with one number", function () {
    assert.deepEqual([2], selectionSort([2]))
  })

  it("returns the same array for a sorted array", function () {
    assert.deepEqual([2, 4, 10, 12], selectionSort([2, 4, 10, 12]))
  })

  it("returns a sorted array", function () {
    assert.deepEqual([2, 4, 10, 12], selectionSort([4, 2, 12, 10]))
  })
})

describe('createUser', function () {
  it('should create a user object', function () {
    assert.deepEqual(
      {name: 'Ari', dob: new Date(1989, 8, 28)},
      createUser('Ari', new Date(1989, 8, 28))
    )
  })
})

describe('calculateAge', function () {
  var user = createUser('Ari', new Date(1989, 8, 28));
  it('should calculate the age correctly for newborns', function () {
    assert.equal(
      0,
      calculateAge(user, new Date(1989, 8, 28)))
  });

  it('should calculate the age correctly in a year after your birthday', function () {
    assert.equal(28, calculateAge(user, new Date(2017, 8, 29)));
    assert.equal(28, calculateAge(user, new Date(2017, 10, 10)));
  })

  it('should calculate the age correctly in a year before your birthday', function () {
    assert.equal(27, calculateAge(user, new Date(2017, 8, 10)));
    assert.equal(27, calculateAge(user, new Date(2017, 7, 1)));
  })
})

describe('addAge', function () {
  it('should add the age to a user object', function () {
    var user = createUser('Ari', new Date(1989, 8, 28));
    addAge(user, new Date(2018, 1, 15));
    assert.deepEqual(
      {name: 'Ari', dob: new Date(1989, 8, 28), age: 28},
      user
    )
  })
})

describe('createUsers', function () {
  it('should return an empty array when given empty arrays', function () {
    assert.deepEqual([], createUsers([], []));
  })

  it('should create an array of users given arrays of names and dates of birth', function () {
    var names = ['Harper', 'Frankie', 'Winter', 'Emerson', 'Sam'];
    var dobs = [new Date(1989, 8, 28), new Date(1976, 9, 4), new Date(1977, 9, 30), new Date(2011, 11, 3), new Date(2014, 11, 28)];
    assert.deepEqual(
      [
        {name: 'Harper', dob: new Date(1989, 8, 28)},
        {name: 'Frankie', dob: new Date(1976, 9, 4)},
        {name: 'Winter', dob: new Date(1977, 9, 30)},
        {name: 'Emerson', dob: new Date(2011, 11, 3)},
        {name: 'Sam', dob: new Date(2014, 11, 28)}
      ],
      createUsers(names, dobs)
    )
  })
})

describe('averageAge', function () {
  it('should return undefined when given an empty array of users', function () {
    assert.isUndefined(averageAge([], new Date(2018, 1, 15)));
  })

  it('should return an average age for an array of users', function () {
    var names = ['Harper', 'Frankie', 'Winter', 'Emerson', 'Sam'];
    var dobs = [new Date(1989, 8, 28), new Date(1976, 9, 4), new Date(1977, 9, 30), new Date(2011, 11, 3), new Date(2014, 11, 28)];
    var users = createUsers(names, dobs);
    assert.equal(23.6, averageAge(users, new Date(2018, 1, 15)));
  })
})
