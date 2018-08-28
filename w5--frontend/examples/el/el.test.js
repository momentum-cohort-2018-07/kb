/* globals test, expect */

import el from './index'

test('can create element', () => {
  expect(el().tagName).toBe('DIV')
  expect(el('div').tagName).toBe('DIV')
  expect(el('ul').tagName).toBe('UL')
})

test('can create element with a class name', () => {
  expect(el('div', {className: 'test'}).classList.contains('test')).toBe(true)
})

test('can create element with a class list', () => {
  expect(el('div', {classList: ['test', 'test2']}).classList.contains('test')).toBe(true)
  expect(el('div', {classList: ['test', 'test2']}).classList.contains('test2')).toBe(true)
})
