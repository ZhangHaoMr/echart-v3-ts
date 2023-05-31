import server from '@/http'

/**
 * 获取商家分布数据
 */
export const getMap = () => {
  return server({
    url: '/map',
    method: 'GET'
  })
}
