jest.mock('axios', () => {
  return ({
    create: () => ({
      get(path, {params: {assignee, page = 1}}) {
        if (path === `/repos/facebook/react/issues`) {
          return {
            data: Array.from(Array(30), issueFake),
            headers: {
              link: githubResponseLinksMock(page, 20)
            }
          }
        }
        if (path === `/repos/facebook/react/assignees`) {
          return {
            data: Array.from(Array(30), assigneeFake),
            headers: {
              link: githubResponseLinksMock(page, 2)
            }
          }
        }
        const error = new Error('')
        error.response = { status: 404 }
        throw error
      }
    }),
  })
  
  function issueFake() {
    issueFake.lastId = issueFake.lastId 
      ? issueFake.lastId + 1 
      : 1
    return { id: issueFake.lastId } 
  }

  function assigneeFake() {
    assigneeFake.lastId = assigneeFake.lastId
      ? assigneeFake.lastId + 1
      : 1
    return { id: assigneeFake.lastId }
  }

  function githubResponseLinksMock(currentPage, lastPage) {
    const links = []

    if (lastPage > 1) {
      if (currentPage > 1) {
        links.push(link({ page: 1, rel: 'first' }))
        links.push(link({ page: currentPage - 1, rel: 'prev' }))
      }
      if (currentPage < lastPage) {
        links.push(link({ page: currentPage + 1, rel: 'next' }))
        links.push(link({ page: lastPage, rel: 'last' }))
      }
    }
    else {
      links.push(link({ page: 1, rel: 'first' }))
      links.push(link({ page: 1, rel: 'prev' }))
      links.push(link({ page: 1, rel: 'last' }))
    }

    return links.join(',\n')

    function link({ page, rel }) {
      return `<https://api.github.com/repositories/10270250/issues?page=${page}>; rel="${rel}"`
    }
  }
})

