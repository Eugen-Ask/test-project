import { axios } from '../system/axios'

export function requestIssues(owner, repo, assignee) { 
  return axios.get(`/repos/${owner}/${repo}/issues`, { params: { assignee } })
}

export function requestAssignees(owner, repo) {
  return axios.get(`/repos/${owner}/${repo}/assignees`)
}

export async function requestRepositoryExistence(owner, repo) { 
  try {
    await axios.get(`/repos/${owner}/${repo}`)
    return { data: { exists: true } }
  }
  catch (e) {
    console.log("e.payload", e.payload)
    return { data: { exists: false } }
  }
}
