import { View, Text } from '@tarojs/components'
import { useState } from 'react'
import cs from 'classnames'
import OrderItem from '../../components/OrderItem'
import s from './index.module.scss'
import { Order } from '../../../types/index'

function Orders() {
  const [isLoading] = useState<boolean>(false)
  let test: Order = {
    status: 'done',
    total_amount: 100,
    order_id: '111',
    type_title: 'test',
    ctime: '2023-4-6',
    address: '888',
    addressee: '1111',
    phone_number: '2222',
    time: '333',
    remarks: '4444',
    isShowDetail: true,
    type: 'shipping-address',
    order_products: [
      {
        product_name: '666',
        total: 99,
        count: 10
      }
    ]
  }
  let orders: Array<Order> = [test, test]
  return (
    <View className={s['page-container']}>
      {!isLoading ? (
        orders.length !== 0 ? (
          orders.map(order => <OrderItem order={order} key={order.order_id} />)
        ) : (
          <View className={s['null-container']}>
            <View
              className={cs(
                'iconfont',
                'icon-dingdanye-meiyoudingdan-shiwangbiaoqing'
              )}
            ></View>
            <Text className={s.text}>暂无订单</Text>
          </View>
        )
      ) : (
        <View className={s['loading-box']}>
          <View className={cs('iconfont', 'icon-jiazaizhong')}></View>
          <View className={s.text}>订单加载中...</View>
        </View>
      )}
      {/*<mp-actionsheet bindactiontap="callout" show="{{showActionsheet}}" actions="{{groups}}"*/}
      {/*                title="{{telephoneNumber}}"></mp-actionsheet>*/}
    </View>
  )
}

export default Orders
