'use strict'

class Counter {
  constructor () {
    this.counts = {}
  }

  add (entry) {
    if (this.counts[entry]) {
      this.counts[entry] += 1
    } else {
      this.counts[entry] = 1
    }
  }

  getFreqs () {
    let words = Object.keys(this.counts)
    let wordsByCount = words.sort((wordA, wordB) => {
      return this.counts[wordB] - this.counts[wordA]
    })
    return wordsByCount.map((word) => {
      return {word: word, freq: this.counts[word]}
    })
  }
}

class Table {
  constructor (headers) {
    this.headers = headers
    this.rows = []
  }

  addRow (row) {
    this.rows.push(row)
  }

  generateDOM () {
    let table = document.createElement('table')
    let headerRow = document.createElement('tr')
    this.headers.forEach((header) => {
      let headerCell = document.createElement('th')
      headerCell.innerText = header
      headerRow.appendChild(headerCell)
    })
    table.appendChild(headerRow)

    this.rows.forEach((row) => {
      let tr = document.createElement('tr')
      row.forEach(function (item) {
        let td = document.createElement('td')
        td.innerText = item
        tr.appendChild(td)
      })
      table.appendChild(tr)
    })
    return table
  }
}

function getStopWords () {
  return `
  i
  me
  my
  myself
  we
  our
  ours
  ourselves
  you
  your
  yours
  yourself
  yourselves
  he
  him
  his
  himself
  she
  her
  hers
  herself
  it
  its
  itself
  they
  them
  their
  theirs
  themselves
  what
  which
  who
  whom
  this
  that
  these
  those
  am
  is
  are
  was
  were
  be
  been
  being
  have
  has
  had
  having
  do
  does
  did
  doing
  a
  an
  the
  and
  but
  if
  or
  because
  as
  until
  while
  of
  at
  by
  for
  with
  about
  against
  between
  into
  through
  during
  before
  after
  above
  below
  to
  from
  up
  down
  in
  out
  on
  off
  over
  under
  again
  further
  then
  once
  here
  there
  when
  where
  why
  how
  all
  any
  both
  each
  few
  more
  most
  other
  some
  such
  no
  nor
  not
  only
  own
  same
  so
  than
  too
  very
  s
  t
  can
  will
  just
  don
  should
  now
  `.trim().split('\n').map(function (w) { return w.trim() })
}

function cleanText (text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z-]/g, ' ')
    .replace(/\s+/g, ' ')
}

function wordCount (text) {
  let words = cleanText(text).split(' ')
  let stopWords = getStopWords()
  console.log(stopWords)

  words = words.filter(function (word) {
    return !stopWords.includes(word)
  })

  let counter = new Counter()
  words.forEach(function (word) {
    counter.add(word)
  })

  return counter
}

document.getElementById('run-word-count').addEventListener('click', function () {
  let text = document.getElementById('text-sample').value
  let counter = wordCount(text)
  let output = document.getElementById('output')
  output.innerHTML = ''

  let table = new Table(['Word', 'Frequency'])
  counter.getFreqs().forEach(function (entry) {
    table.addRow([entry.word, entry.freq])
  })

  output.appendChild(table.generateDOM())
})
