import request from '@/utils/request'

// 按条件分页查询资源接口
export const getResourcePages = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 查询资源分类接口
export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

// 删除资源接口
export const deleteResource = id => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}
// 获取资源项
export const getResourceitem = id => {
  return request({
    method: 'GET',
    url: `/boss/resource/${id}`
  })
}

// 添加或者更新资源接口
export const addOrdataResource = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

// 获取角色拥有的资源列表
// - 在给角色分配资源时，跳转到角色-资源列表页，并标记哪些资源已分配给该角色
export const getRoleResources = roleId => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

// 给角色分配资源
export const allocateRoleResources = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}
