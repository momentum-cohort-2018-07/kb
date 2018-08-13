'use strict'

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

  let counter = words.reduce(function (acc, word) {
    if (!acc[word]) {
      acc[word] = 1
    } else {
      acc[word] += 1
    }
    return acc
  }, {})

  return counter
}

document.getElementById('run-word-count').addEventListener('click', function () {
  let text = document.getElementById('text-sample').value
  let counter = wordCount(text)
  let words = Object.keys(counter)
  let output = document.getElementById('output')
  output.innerHTML = ''

  let table = document.createElement('table')
  let header = document.createElement('tr')
  header.innerHTML = '<th>Word</th><th>Count</th>'
  table.appendChild(header)

  let wordsByCount = words.sort(function (wordA, wordB) {
    return counter[wordB] - counter[wordA]
  })

  let rows = wordsByCount.map(function (word) {
    let row = document.createElement('tr')
    let wordCell = document.createElement('td')
    wordCell.innerText = word
    let countCell = document.createElement('td')
    countCell.innerText = counter[word]
    row.appendChild(wordCell)
    row.appendChild(countCell)
    return row
  })
  console.log(rows)

  rows.forEach(function (row) {
    table.appendChild(row)
  })

  output.appendChild(table)
})
