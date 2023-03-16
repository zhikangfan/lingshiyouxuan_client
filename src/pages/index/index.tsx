import { Component, PropsWithChildren } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

// export default class Index extends Component<PropsWithChildren> {
//
//   componentWillMount () { }
//
//   componentDidMount () { }
//
//   componentWillUnmount () { }
//
//   componentDidShow () { }
//
//   componentDidHide () { }
//
//   render () {
//     return (
//       <View className='index'>
//         <Text>Hello world!</Text>
//         <AtButton type='primary' size='normal'>按钮文案</AtButton>
//       </View>
//     )
//   }
// }

function Index() {
  return <AtButton type='primary' size='normal'>按钮文案</AtButton>
}
export default Index;
