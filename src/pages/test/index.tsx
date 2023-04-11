// import { Component, PropsWithChildren } from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

function Index() {
  async function getPhoneNumber(e) {
    let { errMsg, code } = e.detail
    if (errMsg === 'getPhoneNumber:ok') {
      let res = await Taro.request({
        method: 'POST',
        url: 'http://127.0.0.1:3070/api/phone',
        data: {
          code: code
        }
      })
      console.log(res, '获取手机号')
    }
    console.log(e)
    // cloudID: "67_S3Ap1vCtmDS4KwI4J1oRoExY1JiCJfdFWACN1ulVqhBAFhYC9qkPpMiBpk8"
    // code: "77d2ac8ff8aff75ab05271e5b63a3f27298b131427db8602effe6f14b81c4931"
    // encryptedData: "aug6eagaFD5QW0Mrr2anq0VPo1nrNZgcpnmOIPK/dqw/8hFGI+A/3GOCtp1tzPEZd6TeHLz3pWn8BUfpRDhyS1hnE8L/d4nf++83ZKILCtplETqQHHodqysySJk5m9TndSLxghZhquh9M98e+qlkEZFGQSWKs75IKIl+XvTuNMjbTVqFcWSVPyLqLyBwieCgs8RkcdUJ94miwqc3DOQZOA=="
    // errMsg: "getPhoneNumber:ok"
    // iv: "/J58pGTfG/yj3dRs73kRGw=="
    //
  }

  async function wxLogin() {
    let loginResults = await Taro.login()
    if (loginResults.code) {
      let res = await Taro.request({
        method: 'POST',
        url: 'http://127.0.0.1:3070/api/user/wx/login',
        data: {
          code: loginResults.code,
          userInfo: {
            name: 'jack',
            age: 18
          }
        }
      })
      console.log(res, '登录结果')
    } else {
      console.log('登录失败', loginResults)
    }
  }
  return (
    <View>
      <Button open-type="getPhoneNumber" onGetPhoneNumber={getPhoneNumber}>
        获取手机号
      </Button>
      <Button onTap={wxLogin}>登录</Button>
    </View>
  )
}
export default Index
