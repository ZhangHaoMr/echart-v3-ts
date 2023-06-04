import server from '@/http'

/**
 * 获取商家 数据
 */
export const getStock = () => {
  return server({
    url: '/stock',
    method: 'GET'
  })
}
