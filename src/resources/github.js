import parseLinkHeader from 'parse-link-header'

import { axios } from '../system/axios'

export async function requestIssues(ownerAndRepo, assignee, page) {
  const response = await axios.get(`/repos/${ownerAndRepo}/issues`, { params: { assignee, page } })
  return transformGithubApiResponse(response, page)
}

export async function requestAssignees(ownerAndRepo, page) {
  const response = await axios.get(`/repos/${ownerAndRepo}/assignees`, { params: { page } })
  return transformGithubApiResponse(response, page)
}

function transformGithubApiResponse(axiosResponse, currentPage = 1) { 
  const { data, headers } = axiosResponse
  const totalPages = calculateTotalPages(headers)
  if (currentPage <= totalPages) {
    return { data, totalPages, currentPage }
  }
  throw new Error('Current page number can not be more that total number')
}

function calculateTotalPages(githubApiResponseHeaders) {
  const { prev, last } = parseLinkHeader(githubApiResponseHeaders.link) || {}
  if (last) return +last.page
  if (prev) return +prev.page + 1
  return 1
}
