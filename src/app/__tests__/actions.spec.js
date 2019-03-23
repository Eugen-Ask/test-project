import '../../testing/setupTestingEnvironment'

import * as actions from '../action'
import { createStore } from '../../system/store'
import * as githubApiRequests from '../../resources/github'

describe('Actions', () => {
  let store
  let state
  
  beforeEach(() => {
    store = createStore()
    dispatch(actions.changeRepoInput('facebook/react'))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
  
  async function dispatch(action) { 
    const result = store.dispatch(action) 
    state = store.getState()
    await result
    state = store.getState()
    return result
  }

  describe('loadRepository', () => {
    it('loads assignees', async () => {
      expect(state.app.assignees.data.length).toBe(0)
      await dispatch(actions.loadRepository())
      expect(state.app.assignees.data.length).toBe(30)
    })

    it('loads issues', async () => {
      expect(state.app.issues.data.length).toBe(0)
      await dispatch(actions.loadRepository())
      expect(state.app.issues.data.length).toBe(30)
    })
    
    it('clears loaded data on new call', async () => {
      await dispatch(actions.loadRepository())
      expect(state.app.assignees.data.length).toBe(30)
      expect(state.app.issues.data.length).toBe(30)
      
      const loadingSomeRepo = dispatch(actions.loadRepository())
      expect(state.app.assignees.data.length).toBe(0)
      expect(state.app.issues.data.length).toBe(0)
      
      await loadingSomeRepo
      expect(state.app.assignees.data.length).toBe(30)
      expect(state.app.issues.data.length).toBe(30)
    })

    it('saves error message if error occurs while issues loading', async () => {
      dispatch(actions.changeRepoInput('invalid/repo'))
      try {
        await dispatch(actions.loadRepository())
      } catch (e) {}
      expect(state.app.loadingError).toBe('This repository is not found :(')
    })

    it('removes loaded issues if error occurs while loading issues', async () => {
      await dispatch(actions.loadRepository())
      expect(state.app.issues.data.length).toBe(30)
      dispatch(actions.changeRepoInput('invalid/repo'))
      try {
        await dispatch(actions.loadRepository())
      } catch (e) {}
      expect(state.app.issues.data.length).toBe(0)
    })
  })
  
  describe('loadMoreAssignees', () => {
    it('loads assignees', async () => {
      await dispatch(actions.loadMoreAssignees())
      expect(state.app.assignees.data.length).toBe(30)
      expect(state.app.assignees.lastLoadedPage).toBe(1)
      expect(state.app.assignees.totalPages).toBe(2)
    })
    it('loads more assignees if previous result is not cleared', async () => {
      await dispatch(actions.loadMoreAssignees())
      await dispatch(actions.loadMoreAssignees())
      expect(state.app.assignees.data.length).toBe(60)
      expect(state.app.assignees.lastLoadedPage).toBe(2)
    })
  })

  describe('loadMoreIssues', () => {
    it('loads issues', async () => {
      await dispatch(actions.loadMoreIssues())
      expect(state.app.issues.data.length).toBe(30)
      expect(state.app.issues.lastLoadedPage).toBe(1)
      expect(state.app.issues.totalPages).toBe(20)
    })
    it('loads more issues if previous result is not cleared', async () => {
      await dispatch(actions.loadMoreIssues())
      await dispatch(actions.loadMoreIssues())
      expect(state.app.issues.data.length).toBe(60)
      expect(state.app.issues.lastLoadedPage).toBe(2)
    })
  })
  
  describe('loadIssuesOfAssignee', async () => {
    it('clears previously loaded issues', async () => {
      await dispatch(actions.loadRepository())
      expect(state.app.issues.data.length).toBe(30)
      
      await dispatch(actions.loadIssuesOfAssignee('gaearon'))
      expect(state.app.issues.data.length).toBe(4)
      expect(state.app.issues.data.every(_ => _.assignee.login === 'gaearon')).toBe(true)
    })
    it("doesn't clear previously loaded assignees", async () => {
      await dispatch(actions.loadRepository())
      const previouslyLoadedAssignees = state.app.assignees.data
      expect(previouslyLoadedAssignees.length).toBe(30)

      await dispatch(actions.loadIssuesOfAssignee('gaearon'))
      expect(state.app.assignees.data).toBe(previouslyLoadedAssignees)
    })
    it('loads issues of selected assignee', async () => {
      dispatch(actions.selectAssignee('gaearon'))
      await dispatch(actions.loadIssuesOfAssignee())
      expect(state.app.issues.data.length).toBe(4)
    })
  })
})
