import '../../testing/setupTestingEnvironment'

import * as actions from '../action'
import { createStore } from '../../system/store'
import * as githubApiRequests from '../../resources/github'

describe('Business logic', () => {
  let store
  
  beforeEach(() => {
    store = createStore()
    store.dispatch(actions.changeRepoInput('facebook/react'))
  })

  describe('Repository', () => {
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
    
    it('clears loaded data on new call', async () => {
      await store.dispatch(actions.loadRepository())
      await store.dispatch(actions.loadRepository())
      const { app } = store.getState()
      expect(app.assignees.data.length).toBe(30)
      expect(app.issues.data.length).toBe(30)
    })

    it('saves error message if error occurs while issues loading', async () => {
      store.dispatch(actions.changeRepoInput('invalid/repo'))
      try {
        await store.dispatch(actions.loadRepository())
      } catch (e) {}
      const { app } = store.getState()
      expect(app.loadingError).toBe('This repository is not found')
    })

    it('removes loaded issues if error occurs while loading issues', async () => {
      await store.dispatch(actions.loadRepository())
      let state = store.getState()
      expect(state.app.issues.data.length).toBe(30)
      store.dispatch(actions.changeRepoInput('invalid/repo'))
      try {
        await store.dispatch(actions.loadRepository())
      } catch (e) {}
      state = store.getState()
      expect(state.app.issues.data.length).toBe(0)
    })
  })
  
  describe('Assignees', () => {
    it('loads assignees', async () => {
      await store.dispatch(actions.loadAssignees())
      const { app } = store.getState()
      expect(app.assignees.data.length).toBe(30)
      expect(app.assignees.lastLoadedPage).toBe(1)
      expect(app.assignees.totalPages).toBe(2)
    })
    it('loads more assignees if previous result is not cleared', async () => {
      await store.dispatch(actions.loadAssignees())
      await store.dispatch(actions.loadAssignees())
      const { app } = store.getState()
      expect(app.assignees.data.length).toBe(60)
      expect(app.assignees.lastLoadedPage).toBe(2)
    })
  })

  describe('Issues', () => {
    it('loads issues', async () => {
      await store.dispatch(actions.loadIssues())
      const { app } = store.getState()
      expect(app.issues.data.length).toBe(30)
      expect(app.issues.lastLoadedPage).toBe(1)
      expect(app.issues.totalPages).toBe(20)
    })
    it('loads more issues if previous result is not cleared', async () => {
      await store.dispatch(actions.loadIssues())
      await store.dispatch(actions.loadIssues())
      const { app } = store.getState()
      expect(app.issues.data.length).toBe(60)
      expect(app.issues.lastLoadedPage).toBe(2)
    })
  })
})
