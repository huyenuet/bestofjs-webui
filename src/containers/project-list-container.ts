// import React from 'react'
import { createContainer } from 'unstated-next'
import { useAsync } from 'react-async'

import { fetchJSON } from '../helpers/fetch'
import api from '../api/config'

import { getProjectId } from 'components/core/project'

function useProjectList() {
  const state = useLoadProjects()
  console.info(state)
  return state
  // const [{ projects, tags, isLoading }, setData] = useState({
  //   projects: {},
  //   tags: {},
  //   isLoading: true
  // })
  // const
  // return { projects, tags, isLoading }
}

export const ProjectDataContainer = createContainer(useProjectList)
export const ProjectDataProvider = ProjectDataContainer.Provider
// export const useProjectData = Container.useContainer()

export function useSelector(selector) {
  const state = ProjectDataContainer.useContainer()
  return selector(state)
}

function fetchProjectsFromAPI() {
  const url = `${api('GET_PROJECTS')}/projects.json`
  return fetchJSON(url)
}

function useLoadProjects() {
  const { data, ...rest } = useAsync({ promiseFn: fetchProjectsFromAPI })
  if (!data)
    return {
      ...rest,
      meta: {},
      entities: { projects: {}, tags: {} },
      auth: { myProjects: [] }
    }
  return {
    ...rest,
    entities: {
      projects: getProjectsBySlug(data.projects),
      tags: getTagsByCode(data.tags)
    },
    meta: {
      lastUpdate: new Date(data.date)
    },
    auth: { myProjects: [] }
  }
}

function getProjectsBySlug(projects) {
  const projectsBySlug = {}
  const total = projects.length

  projects.forEach((project, index) => {
    const slug = getProjectId(project)
    projectsBySlug[slug] = {
      slug,
      addedPosition: total - index,
      ...project,
      packageName: project.npm
    }
  })
  return projectsBySlug
}

function getTagsByCode(tags) {
  const tagsByCode = tags.reduce((acc, tag) => {
    return { ...acc, [tag.code]: { ...tag, id: tag.code } }
  }, {})
  return tagsByCode
}
