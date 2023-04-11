import { View, Image, Text, Navigator } from '@tarojs/components'
import cs from 'classnames'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import s from './index.module.scss'

// import Vtabs from '../../components/Vtabs'

enum PageType {
  BUY_PAGE = 'buy-page',
  DYNAMIC_PAGE = 'dynamic-page'
}

function Home() {
  const [hidden, setHidden] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<'buy-page' | 'dynamic-page'>(
    PageType.BUY_PAGE
  )
  const [allBuys] = useState<number>(0)
  const [totalAmount] = useState<number>(0)
  const [isCloseAnAccount] = useState<boolean>(false)

  function showCallDialog() {}

  function showModal() {
    setHidden(!hidden)
  }

  function payment() {}

  function handleShopCar() {}

  function jumpOrder() {
    Taro.navigateTo({
      url: ''
    })
  }

  return (
    <>
      <View className={s['page-container']}>
        <View
          className={cs(s['store-info-container'], {
            [s.scale]: hidden
          })}
        >
          <Image
            src="https://service.haloworld.icu/images/store-bg.jpg"
            className={s['bg-image']}
          ></Image>
          <View className={s['store-content-container']}>
            <View className={s['store-content-top']}>
              <View
                className={cs(s['iconfont'], 'icon-wodekefu', 'iconfont')}
                onTap={showCallDialog}
              ></View>
            </View>
            <View className={s['store-content-bottom']}>
              <View className={s['store-info-box']}>
                <Image
                  src="https://service.haloworld.icu/images/store-logo.png"
                  className={s['store-logo']}
                ></Image>
                <View className={s['store-info-box-right']}>
                  <View className={s['store-info']}>
                    <Text className={s['store-name']}>
                      零食优选 ｜ 怀化学院店
                    </Text>
                    <View className={s['iconfont']} onTap={showModal}>
                      <Text className={cs('icon-xiajiantou')}></Text>
                    </View>
                  </View>
                  <Text className={s['slogan']}>生活优+，零食优选</Text>
                </View>
              </View>
              <View className={s['payment-container']} onTap={payment}>
                <Text
                  className={cs([s['iconfont'], 'icon-erweima', 'iconfont'])}
                ></Text>
                <Text className={s['text']}>付款</Text>
              </View>
            </View>
          </View>
        </View>
        <View className={s['main-container']}>
          <View className={s['main-container-top']}>
            <View
              className={cs(s['title'], {
                [s['current']]: currentPage === PageType.DYNAMIC_PAGE
              })}
              onTap={() => {
                setCurrentPage(PageType.DYNAMIC_PAGE)
              }}
            >
              动态
            </View>
            <View
              className={cs(s['title'], {
                [s['current']]: currentPage === PageType.BUY_PAGE
              })}
              onTap={() => {
                setCurrentPage(PageType.BUY_PAGE)
              }}
            >
              下单
            </View>
          </View>
          <View className={s['show-container']}>
            {/*动态页*/}
            <View
              className={cs(s['dynamic-container'], {
                [s['show']]: currentPage === PageType.DYNAMIC_PAGE
              })}
            >
              <View
                className={s['dynamic-list']}
                style={{ display: 'none' }}
              ></View>
              <View className={s.null}>
                <Text
                  className={cs('iconfont', 'icon-meiyouxiaoxi', s.iconfont)}
                ></Text>
                <Text className={s.text}>暂无历史动态</Text>
              </View>
            </View>
            {/*下单页*/}
            <View
              className={cs(s['buy-container'], {
                [s['show']]: currentPage === PageType.BUY_PAGE
              })}
            >
              <View className={s['buy-container-top']}>
                <Text className={s['tips']}>定点取货免费配送</Text>
                <Navigator
                  url="/pages/orders/index"
                  openType="navigate"
                  className={s['order-history-link']}
                >
                  <Text
                    className={cs('iconfont', 'icon-wodedingdan', s.iconfont)}
                  ></Text>
                  我的订单
                </Navigator>
              </View>
            </View>
          </View>
        </View>
        {currentPage === PageType.BUY_PAGE && (
          <View className={s['bottom-container']}>
            <View className={s.total}>
              <View className={s['shop-count']} onTap={handleShopCar}>
                <Text
                  className={cs(s.iconfont, 'iconfont', 'icon-shouye')}
                ></Text>
                <Text className={s['nums']}>{allBuys}</Text>
              </View>
              <Text className={s.title}>合计：</Text>
              <Text className={s.price}>¥{totalAmount}</Text>
            </View>
            <View
              className={cs(s.button, { [s.disabled]: isCloseAnAccount })}
              onTap={jumpOrder}
            >
              去结算
            </View>
          </View>
        )}
      </View>
    </>
  )
}

export default Home
