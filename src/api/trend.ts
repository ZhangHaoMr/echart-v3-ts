import server from '@/http'

/**
 * 获取 地区销量 数据
 */
export const getTrend = () => {
  return server({
    url: '/trend',
    method: 'GET'
  })
}
