import cs from 'classnames';
import {Text, View} from '@tarojs/components';
import s from './index.module.scss';
import {Order, OrderType, OrderStatus} from '../../../types'


interface OrderItemProps {
  order: Order
  onShowDetail?: () => void,
  onShowCallDialog?: () => void
  onCancelOrder?: () => void
}

function OrderItem({order, onShowDetail, onShowCallDialog, onCancelOrder}: OrderItemProps) {


  function handleShowDetail() {
    onShowDetail && onShowDetail();
  }

  function showCallDialog() {
    onShowCallDialog && onShowCallDialog();
  }

  function cancelOrder() {
    onCancelOrder && onCancelOrder();
  }

  return (
    <View className={s['weui-form-preview']}>

      <View className='weui-form-preview__hd'>

        <View className='weui-form-preview__label'>付款金额</View>

        <View className='weui-form-preview__value_in-hd'>¥{order.total_amount}</View>

      </View>

      <View className='weui-form-preview__bd'>

        <View className='weui-form-preview__item'>

          <View className='weui-form-preview__label'>订单编号</View>

          <View className='weui-form-preview__value'>{order.order_id}
          </View>

        </View>
        <View className='weui-form-preview__item'>

          <View className='weui-form-preview__label'>订单类型</View>

          <View className='weui-form-preview__value'>{order.type_title}</View>

        </View>
        <View className='weui-form-preview__item'>

          <View className='weui-form-preview__label'>下单时间</View>

          <View className='weui-form-preview__value'>{order.ctime}</View>

        </View>
        {order.type === 'shipping-address' && (
          <View className='weui-form-preview__item'>

            <View className='weui-form-preview__label'>收货人</View>

            <View className='weui-form-preview__value'>{order.addressee}</View>

          </View>
        )}
        <View className='weui-form-preview__item'>

          <View className='weui-form-preview__label'>联系电话</View>

          <View className='weui-form-preview__value'>{order.phone_number}</View>

        </View>
        {(order.type === OrderType.TO_THE_STORE || OrderType.APPOINTED_TIME) && (
          <View className='weui-form-preview__item'>

            <View className='weui-form-preview__label'>自提时间</View>

            <View className='weui-form-preview__value'>{order.time}</View>

          </View>
        )}
        {order.type === OrderType.SHIPPING_ADDRESS && (
          <View className='weui-form-preview__item'>

            <View className='weui-form-preview__label'>收货地址</View>

            <View className='weui-form-preview__value'>{order.address}</View>

          </View>

        )}
        {(order.type === OrderType.TO_THE_STORE || OrderType.APPOINTED_TIME) && (
          <View className='weui-form-preview__item'>

            <View className='weui-form-preview__label'>商家地址</View>

            <View className='weui-form-preview__value'>湖南省怀化市鹤城区金海路27号</View>

          </View>
        )}
        <View className='weui-form-preview__item'>

          <View className='weui-form-preview__label'>备注</View>

          <View className='weui-form-preview__value'>{order.remarks}</View>

        </View>


      </View>
      {order.isShowDetail && (
        <View className='weui-form-preview__bd'>
          {
            order.order_products.map((product, index) => (
              <View className='weui-form-preview__item' key={index}>
                <View className='weui-form-preview__label'>{product.product_name}</View>
                <View className='weui-form-preview__value'>
                  <Text className='count' style={{display: 'inline-block', marginRight: '35px'}}>*{product.count}</Text>
                  <Text className='price'
                    style={{display: 'inline-block', width: '100px', textAlign: 'right'}}
                  >¥{product.total}</Text>
                </View>

              </View>
            ))
          }

        </View>
      )}

      {
        !order.isShowDetail ? (
          <View className={s['view-detail']} data-idx={order.order_id} onTap={handleShowDetail}>
            <Text className={s['detail-text']}>查看详情</Text>
            <Text className={cs('iconfont', 'icon-xiajiantou')}></Text>
          </View>
        ) : (
          <View className={s['view-detail']} data-idx={order.order_id} onTap={handleShowDetail}>
            <Text className={s['detail-text']}>收起详情</Text>
            <Text className={cs('iconfont', 'icon-shangjiantou')}></Text>
          </View>
        )
      }


      <View className='weui-form-preview__ft'>

        <View className='weui-form-preview__btn weui-form-preview__btn_default'
          hover-class='weui-form-preview__btn_active' onTap={showCallDialog}
        >联系商家
        </View>

        {(order.status === OrderStatus.DONE || OrderStatus.CANCEL) && (<View className='weui-form-preview__btn weui-form-preview__btn_primary'
          hover-class='weui-form-preview__btn_active'
        >再来一单</View>)}

        {order.status === OrderStatus.QUEUE && (
          <View className='weui-form-preview__btn weui-form-preview__btn_primary'
            hover-class='weui-form-preview__btn_active' onTap={cancelOrder}
          >取消订单
          </View>

        )}

      </View>

    </View>
  )
}

export default OrderItem;
