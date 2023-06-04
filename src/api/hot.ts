import server from '@/http'

/**
 * 获取 热销商品占比 数据
 */
export const getHot = () => {
  return server({
    url: '/hotproduct',
    method: 'GET'
  })
}
