import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import './mocks/axios'
import './mocks/debounce'

jest.useFakeTimers();

configure({ adapter: new Adapter() })
