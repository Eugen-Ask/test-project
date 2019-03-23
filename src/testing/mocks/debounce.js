import debouce from 'lodash/debounce'

jest.mock('lodash/debounce')
debouce.mockImplementation((fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
})
