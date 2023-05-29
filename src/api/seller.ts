import server from '@/http'

/**
 * 获取商家销售统计数据
 */
export const getSeller = () => {
  return server({
    url: '/seller',
    method: 'GET'
  })
}
