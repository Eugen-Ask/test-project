import React from 'react'
import { mount } from 'enzyme'

import '../../../testing/setupTestingEnvironment'
import { withActionLoadingIndicators } from './'

describe('withActionLoadingIndicators', () => {
  let props
  let mapper
  let component
  
  beforeEach(() => {
    props = { 
      num: 777,
      bool: true,
      loadProducts: jest.fn(() => Promise.resolve()),
    }
    mapper = {
      loadProducts: 'products'
    }
    render(App)
  })
  
  afterEach(() => {
    jest.restoreAllMocks()
  })
  
  function render(additionalProps = {}, mapLoadingIndicators = mapper) {
    const WrappedComponent = withActionLoadingIndicators(mapLoadingIndicators)(App)
    component = mount(<WrappedComponent {...props} {...additionalProps}/>)
  }

  it('renders all external props correctly', () => {
    render()
    const props = component.find(App).props()
    expect(props.num).toBe(777)
    expect(props.bool).toBe(true)
  })

  it('injects "loading" prop', () => {
    render()
    const props = component.find(App).props()
    expect(props.loading).toBeDefined()
  })

  it('does its work properly', async () => {
    render()
    const loadProducts = component.find('button').props().onClick
    expect(component.text()).not.toContain('LOADING')
    const loading = loadProducts()
    expect(component.text()).toContain('LOADING')
    await loading
    expect(component.text()).not.toContain('LOADING')
  })
})

export function App(props) {
  return (
    <div>
      { props.loading.products &&
        <div>LOADING</div>
      }
      <button onClick={props.loadProducts}>
        Load products
      </button>
    </div>
  )
} 
