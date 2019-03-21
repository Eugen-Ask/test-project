import '../../system/setupTestingEnvironment'

import * as actions from '../action'
import { createStore } from '../../system/store'
import * as githubApiRequests from '../../resources/github'

describe('Business logic', () => {
  let store
  
  beforeEach(() => {
    store = createStore()
  })

  describe('Repository loading', () => {
    it('calls loading assignees', async () => {
      const requestAssignees = jest.spyOn(githubApiRequests, 'requestAssignees')
      await store.dispatch(actions.loadRepository())
      expect(requestAssignees).toHaveBeenCalled()
    })

    it('calls loading issues', async () => {
      const requestIssues = jest.spyOn(githubApiRequests, 'requestAssignees')
      await store.dispatch(actions.loadRepository())
      expect(requestIssues).toHaveBeenCalled()
    })
  })
  
  describe('Assignees loading', () => {
    it('loads assignees', async () => {
      await store.dispatch(actions.loadAssignees())
      const { app } = store.getState()
      expect(app.assignees.data.length).toBe(3)
      expect(app.assignees.lastLoadedPage).toBe(1)
      expect(app.assignees.totalPages).toBe(20)
    })
    it('loads more assignees if previous result is not cleared', async () => {
      await store.dispatch(actions.loadAssignees())
      await store.dispatch(actions.loadAssignees())
      const { app } = store.getState()
      expect(app.assignees.data.length).toBe(6)
      expect(app.assignees.lastLoadedPage).toBe(2)
    })
  })

  describe('Issues loading', () => {
    it('loads issues', async () => {
      await store.dispatch(actions.loadIssues())
      const { app } = store.getState()
      expect(app.issues.data.length).toBe(3)
      expect(app.issues.lastLoadedPage).toBe(1)
      expect(app.issues.totalPages).toBe(20)
    })
    it('loads more issues if previous result is not cleared', async () => {
      await store.dispatch(actions.loadIssues())
      await store.dispatch(actions.loadIssues())
      const { app } = store.getState()
      expect(app.issues.data.length).toBe(6)
      expect(app.issues.lastLoadedPage).toBe(2)
    })
  })
})

jest.mock('axios', () => ({
  create: () => ({
    async get(path, params) {
      return await {
        data: [{}, {}, {}],
        headers: {
          link: `
            <https://api.github.com/repositories/10270250/issues?page=19>; rel="prev", 
          `
        }
      }
    }
  }),
}))
