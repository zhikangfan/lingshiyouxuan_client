import Taro from '@tarojs/taro'

export async function makePhoneCall(phoneNumber) {
  return Taro.makePhoneCall({
    phoneNumber: phoneNumber
  })
}
