import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import debouce from 'lodash/debounce'

import '../testing/mocks/axios'

configure({ adapter: new Adapter() })

jest.useFakeTimers();

jest.mock('lodash/debounce')
debouce.mockImplementation((fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
})
