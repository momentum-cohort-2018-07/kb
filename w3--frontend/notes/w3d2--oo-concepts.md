# Object-oriented programming

---

# What is an *object?*

An object combines **state**, **behavior**, and **identity**.

* State is data, known as attributes or properties.
* Behaviors are known as methods.
* Identity is the object's *class*.

---

# Set functions in JavaScript

```js
function setAdd(set, item) {
  if (!set.includes(item))
    set.push(item)
}

function setHas(set, item) {
  return set.includes(item)
}

function setDelete(set, item) {
  var index = set.indexOf(item)
  if (index !== -1)
    set.splice(index, 1)
}
```

---

# Using a set with our functions

```js
var mySet = []

setAdd(mySet, "Clinton")
setAdd(mySet, "Amy")
setAdd(mySet, "Clinton")

mySet                      // => [ 'Clinton', 'Amy' ]

setHas(mySet, "Clinton")   // => true
setHas(mySet, "Jessica")   // => false

setDelete(mySet, "Clinton")
setHas(mySet, "Clinton")   // => false

mySet                      // => [ 'Amy' ]
```

---

# The Set object in JavaScript

```js
var students = new Set()

students.add("Hunter") // a method
students.add("Alyssa")

students.size // 2 - a property, data about the set

students.has("Hunter") // true -- a method
students.delete("Hunter")
students.has("Hunter") // false -- a method
```

---

# Is this better?

- What benefits does this give us?
- We will come back to see the claimed benefits.

---

# What does `new Set()` do?

It creates an _instance_ of `Set`, or a `Set` object.
These terms are interchangable.

---

# What does `students.add(name)` do?

The common way of referring to this is "we called the `add` method on `students` with the argument `name`.

Another way of thinking of this is "we sent the `add` message to `students` with the argument `name`."

---

# Exercise: object-oriented programming with phones

* What properties does your phone have?
* What actions can your phone do?
* Could you organize phones into a hierarchy?

---

# What is a *class*?

A _class_ is a blueprint for an object.

```js
var students = new Set() // js
```
```rb
students = Set.new       # ruby
```

`Set` is a class[^1]; `students` is an object.

[^1]: not really a class, but close enough; will discuss with JS people later

---

# Inheritance

Vehicle → Four-Wheeled Vehicle → Car → Sedan
A sedan *is a* car, which *is a* four-wheeled vehicle, which *is a* vehicle.

Animal → Mammal → Primate → Orangutan

---

# Exercise: inheritance is tricky

- What's the inheritance chain for a ukulele?
- What's the inheritance chain for a diet root beer?
- What's the inheritance chain for a person in the classroom?

---

# Composition

A person *has a* job, has family members, has communities.

```
Person
  Job
  Person[] (family)
  Community[]
```

Building objects out of other objects is composition.

---

# Is this better?

- Claimed benefits
  - Code reuse
  - Improved software maintainability
  - Better design: OOP forces programmers to spend more time in design
  - Encapsulation: once an object is created, knowledge of its implementation is not necessary to use it
