import { View, Text, Button, Picker, Input, Image } from '@tarojs/components'
import { useState } from 'react'
import Taro, { useLoad } from '@tarojs/taro'
import cs from 'classNames'
import s from './index.module.scss'

export enum pickUpType {
  SHIPPING_ADDRESS = 'shipping-address',
  TO_THE_STORE = 'to-the-store',
  SCAN_CODES = 'scan-codes',
  APPOINTED_TIME = 'appointed-time'
}

type TakeType =
  | pickUpType.SHIPPING_ADDRESS
  | pickUpType.TO_THE_STORE
  | pickUpType.SCAN_CODES
  | pickUpType.APPOINTED_TIME

interface PickerType {
  title?: string
  date?: {
    year: string | number
    month: string | number
    day: string | number
  }
  hours?: Array<string>
}

function Payment() {
  const [current_service, setCurrentService] = useState<TakeType>(
    pickUpType.SHIPPING_ADDRESS
  )
  const [isToday, setIsToday] = useState<boolean>(false)
  const [remark] = useState<string>('')
  const [bill] = useState({
    totalPreferentialPrice: 0,
    totalAmount: 0,
    buys: 0,
    products: [
      {
        title: '1',
        buys: 0,
        price: 10,
        historical_price: 29,
        pictures: [
          {
            url: ''
          }
        ]
      }
    ]
  })
  const [order] = useState({
    userName: '测试名称',
    telNumber: '13999499562',
    address: '3'
  })

  const [multiIndex] = useState([0, 0])
  const [multiArray, setMultiArray] = useState<any[]>([])
  const [dateOptions, setDateOptions] = useState<Array<PickerType>>([])
  const [dateColumnIndex, setDateColumnIndex] = useState<number>(0)
  const [hoursColumnIndex, setHoursColumnIndex] = useState<number>(0)
  const [dateColumn, setDateColumn] = useState<any[]>([])
  const [hoursColumn, setHoursColumn] = useState<any[]>([])

  function formatDate(d: number) {
    let year = new Date(d).getFullYear(),
      month =
        new Date(d).getMonth() + 1 >= 10
          ? new Date(d).getMonth() + 1
          : '0' + (new Date(d).getMonth() + 1),
      day =
        new Date(d).getDate() >= 10
          ? new Date(d).getDate()
          : '0' + new Date(d).getDate()

    return {
      year,
      month,
      day
    }
  }

  function renderDatePicker() {
    let column: any[] = []
    // 渲染最近三天
    for (let i = 0; i < 3; i++) {
      let info: PickerType = {}
      let d = new Date().getTime() + i * 24 * 60 * 60 * 1000
      let date = formatDate(d)

      let hours: Array<string> = []
      // 如果是今天
      if (i === 0) {
        if (new Date().getHours() < 22) {
          info = {
            title: i === 0 ? '今天' : `${date.year}/${date.month}/${date.day}`,
            ...date
          }
          let nowHours =
            new Date().getHours() < 9
              ? 9
              : new Date().getMinutes() < 30
              ? new Date().getHours()
              : new Date().getHours() + 1
          hours.push('立即自提')
          while (nowHours <= 22) {
            if (nowHours === 22) {
              hours.push(nowHours + ':00')
            } else {
              if (new Date().getMinutes() < 30) {
                hours.push(nowHours + ':30')
              } else {
                hours.push(nowHours + ':00')
                hours.push(nowHours + ':30')
              }
            }

            nowHours++
          }
          info.hours = hours
          column.push(info)
        }
      } else {
        info = {
          title: i === 0 ? '今天' : `${date.year}/${date.month}/${date.day}`,
          ...date
        }
        let nowHours = 9
        while (nowHours <= 22) {
          if (nowHours === 22) {
            hours.push(nowHours + ':00')
          } else {
            hours.push(nowHours + ':00')
            hours.push(nowHours + ':30')
          }

          nowHours++
        }
        info.hours = hours
        column.push(info)
      }
    }
    console.log(column)
    setDateOptions(column)
    let title: string[] = []
    column.forEach(ele => {
      title.push(ele.title)
    })
    setDateColumn(title)
    setHoursColumn(column[multiIndex[1]].hours)
    setMultiArray([dateColumn, hoursColumn])
    setIsToday(() => new Date().getHours() >= 13) // 判断是否超过13:00 用于定点取货
  }

  function changeService(type: TakeType) {
    // 如果点击扫码点餐 则略过不支持
    if (type === pickUpType.SCAN_CODES) {
      Taro.showToast({
        title: '暂不支持该方式',
        icon: 'error'
      })
    } else {
      setCurrentService(type)
    }
  }

  function chooseAddress() {}

  function submitOrder() {}

  function openMap() {}

  function jumpRemark() {}

  function bindMultiPickerChange() {}

  function bindMultiPickerColumnChange() {}

  function inputTelNumbers() {}

  useLoad(() => {
    renderDatePicker()
  })

  return (
    <>
      <View className={s['page-container']}>
        <View className={s['service-options-container']}>
          <View className={s['service-options']}>
            <Button
              className={cs(s['options-btn'], {
                [s.current]: 'shipping-address' === current_service
              })}
              onTap={() => {
                changeService(pickUpType.SHIPPING_ADDRESS)
              }}
              data-service="shipping-address"
            >
              外送服务
            </Button>
            <Button
              className={cs(s['options-btn'], {
                [s.current]: 'to-the-store' === current_service
              })}
              onTap={() => {
                changeService(pickUpType.TO_THE_STORE)
              }}
              data-service="to-the-store"
            >
              到店自提
            </Button>
            <Button
              className={cs(s['options-btn'], {
                [s.current]: 'scan-codes' === current_service
              })}
              onTap={() => {
                changeService(pickUpType.SCAN_CODES)
              }}
              data-service="scan-codes"
            >
              扫码点餐
            </Button>
            <Button
              className={cs(s['options-btn'], {
                [s.current]: 'appointed-time' === current_service
              })}
              onTap={() => {
                changeService(pickUpType.APPOINTED_TIME)
              }}
              data-service="appointed-time"
            >
              定点取货
            </Button>
          </View>
          <View className={s['show-components']}>
            <View
              className={cs(s['shipping-address'], {
                [s.show]: 'shipping-address' === current_service
              })}
              onTap={chooseAddress}
            >
              <Text className={s.title}>收获地址</Text>
              <View className={s['info-value']}>
                <View className={s.info}>
                  <View className={s.address}>{order.address}</View>

                  <View className={s['user-info']}>
                    <Text className={s['user-name']}>{order.userName}</Text>
                    <Text className={s['phone-number']}>{order.telNumber}</Text>
                  </View>
                </View>
                <Text
                  className={cs('iconfont', 'icon-youjiantou', s.iconfont)}
                ></Text>
              </View>
            </View>
            <View
              className={cs(s['to-the-store'], {
                [s.show]: 'to-the-store' === current_service
              })}
            >
              <View className={s['item-info']} onTap={openMap}>
                <Text className={s.title}>商家地址</Text>
                <View className={s['item-info-value']}>
                  <Text className={s['store-address']}>
                    湖南省怀化市鹤城区金海路27号
                  </Text>
                  <Text
                    className={cs('iconfont', 'icon-youjiantou', s.iconfont)}
                  ></Text>
                </View>
              </View>
              <View className={s['item-info']}>
                <Text className={s.title}>自提时间</Text>
                <View className={s['item-info-value']}>
                  <Picker
                    mode="multiSelector"
                    onChange={bindMultiPickerChange}
                    onColumnChange={bindMultiPickerColumnChange}
                    value={multiIndex}
                    rangeKey="title"
                    range={multiArray}
                  >
                    <View className={s['picker']}>
                      {/*{multiArray[0][multiIndex[0]]}*/}
                      {/*{multiArray[1][multiIndex[1]]}*/}
                    </View>
                  </Picker>
                  <Text
                    className={cs('iconfont', 'icon-youjiantou', s.iconfont)}
                  ></Text>
                </View>
              </View>
              <View className={s['item-info']}>
                <Text className={s.title}>联系方式</Text>
                <Input
                  type="number"
                  value={order.telNumber}
                  maxlength={11}
                  onInput={inputTelNumbers}
                  placeholder="填写手机号码，便于商家联系"
                  className={s['phone-number-input']}
                />
              </View>
            </View>
            <View
              className={cs(s['appointed-time'], {
                [s.show]: 'appointed-time' === current_service
              })}
            >
              <View className={s['item-info']}>
                <Text className={s.title}>取货点</Text>
                <View className={s['address-time-box']}>
                  <Text className={s.address}>怀化市鹤城区金海路27号</Text>
                  <Text className={s.time}>
                    {isToday ? '明天' : '今天'}13:00取货
                  </Text>
                </View>
              </View>
              <View className={cs(s['item-info'], s['contact'])}>
                <Text className={s.title}>联系方式</Text>
                <Input
                  type="number"
                  value={order.telNumber}
                  maxlength={11}
                  onInput={inputTelNumbers}
                  placeholder="填写手机号码，便于商家联系"
                  className={s['phone-number-input']}
                />
              </View>
            </View>
          </View>
        </View>
        <View className={s['order-container']}>
          <View className={s['orders-count']}>共{bill.buys}件商品</View>
          <View className={s['product-list']}>
            {bill.products.map((product, idx) => (
              <View className={s['product-item']} key={idx}>
                <View className={s['product-item-left']}>
                  <Image
                    src={product.pictures[0].url}
                    className={s['product-picture']}
                  />
                  <Text className={s['product-name']}>{product.title}</Text>
                </View>
                <View className={s['product-item-right']}>
                  <Text className={s.num}>*{product.buys}</Text>
                  <View className={s.price}>
                    <Text className={s['current-price']}>¥{product.price}</Text>
                    {product.historical_price && (
                      <Text className={s['history-price']}>
                        ¥{product.historical_price}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View className={cs(s['total-prices-container'])}>
            <View className={s['preferential-price']}>
              已优惠
              <Text className={s.perferential}>
                ¥{bill.totalPreferentialPrice}
              </Text>
              ，
            </View>
            <View className={s['total-prices']}>
              合计 <Text className={s.total}>¥{bill.totalAmount}</Text>
            </View>
          </View>
          <View className={s['remark-container']} onTap={jumpRemark}>
            <Text className={s.title}>备注</Text>
            <View className={s.notNull}>
              {remark ? (
                <Text>{remark}</Text>
              ) : (
                <Text className={s['input-remark']}>填写备注</Text>
              )}
              <Text className={cs('iconfont', 'icon-youjiantou')}></Text>
            </View>
          </View>
        </View>
        <View className={s['fixed-container']}>
          <View className={s.total}>
            <Text className={s.title}>合计：</Text>
            <Text className={s.price}>¥{bill.totalAmount}</Text>
          </View>
          <View className={s.button} onTap={submitOrder}>
            提交订单
          </View>
        </View>
      </View>
    </>
  )
}

export default Payment
