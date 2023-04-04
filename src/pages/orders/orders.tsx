import { View, Image, Text } from '@tarojs/components'
import cs from 'classnames'
import { useState } from 'react'
// import Taro from '@tarojs/taro'
import s from './orders.module.scss'
function PageOrders() {
  const [hidden, setHidden] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<'buy-page' | 'dynamic-page'>('buy-page')
  function showCallDialog() {

  }

  function showModal() {
      setHidden(!hidden)
  }

  function payment() {

  }

  return <>
    <View className={s['page-container']}>
      <View className={cs(s['store-info-container'], {
         [s.scale] : hidden
      })}
      >
        <Image src='https://service.haloworld.icu/images/store-bg.jpg' className={s['bg-image']}></Image>
        <View className={s['store-content-container']}>
          <View className={s['store-content-top']}>
            <View className={cs(s['iconfont'],'icon-wodekefu', 'iconfont')} onTap={showCallDialog}></View>
          </View>
          <View className={s['store-content-bottom']}>
            <View className={s['store-info-box']}>
              <Image src='https://service.haloworld.icu/images/store-logo.png' className={s['store-logo']}></Image>
              <View className={s['store-info-box-right']}>
                <View className={s['store-info']}>
                  <Text className={s['store-name']}>零食优选 ｜ 怀化学院店</Text>
                  <View className={s['iconfont']} onTap={showModal}>
                    <Text className={cs('icon-xiajiantou')}></Text>
                  </View>
                </View>
                <Text className={s['slogan']}>生活优+，零食优选</Text>
              </View>
            </View>
            <View className={s['payment-container']} onTap={payment}>
              <Text className={cs([s['iconfont'], 'icon-erweima', 'iconfont'])}></Text>
              <Text className={s['text']}>付款</Text>
            </View>
          </View>

        </View>

      </View>
      <View className={s['main-container']}>
        <View className={s['main-container-top']}>
          <View className={cs(s['title'], {[s['current']] : currentPage === 'dynamic-page'})} onTap={() => {
            setCurrentPage('dynamic-page')
          }}
            data-page='dynamic-page'
          >动态
          </View>
          <View className={cs(s['title'], {[s['current']]: currentPage === 'buy-page'})} onTap={() => {
            setCurrentPage('buy-page')
          }}
            data-page='buy-page'
          >下单
          </View>
        </View>
        <View className={s['show-container']}>
          {/*动态页*/}
          <View className={cs(s['dynamic-container'], {[s['show']]: currentPage === 'dynamic-page'})}>

            <View className={s['dynamic-list']} style={{display: 'none'}}>

            </View>
            <View className={s.null}>
              <text className={cs('iconfont', 'icon-meiyouxiaoxi', s.iconfont)}></text>
              <text className={s.text}>暂无历史动态</text>
            </View>
          </View>
          {/*下单页*/}
          <View className={cs(s['buy-container'], {[s['show']]: currentPage === 'buy-page'})}>


          </View>
        </View>
      </View>
    </View>
  </>
}

export default PageOrders;
