import '../../system/setupTestingEnvironment'

import * as actions from '../action'
import { createStore } from '../../system/store'
import { requestAssignees } from '../../resources/github'

jest.mock('../../resources/github')

describe('Business logic', () => {
  let store
  
  beforeEach(() => {
    store = createStore()
  })

  describe('Repository loading', () => {
    it('calls loading assignees', async () => {
      requestAssignees.mockResolvedValue({
        data: [],
      });
      
      await store.dispatch(actions.loadRepository())
      expect(requestAssignees).toHaveBeenCalled()
    })
  })
  
  describe('Assignees loading', () => {
    it('loads assignees', async () => {
      requestAssignees.mockResolvedValue({
        data: [{}, {}, {}],
        currentPage: 777,
        totalPages: 888,
      });
      
      await store.dispatch(actions.loadAssignees())
      const { app } = store.getState()
      expect(app.assignees.data.length).toBe(3)
      expect(app.assignees.lastLoadedPage).toBe(777)
      expect(app.assignees.totalPages).toBe(888)
    })
  })
})
