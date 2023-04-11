import { View, Slot } from '@tarojs/components'
import s from './index.module.scss'

interface VtabsContentProps {
  tabIndex: number
}
function Index(props: VtabsContentProps) {
  let { tabIndex = 0 } = props
  return (
    <View
      className={s['weui-vtabs-content__item']}
      id={`weui-vtabs-content__${tabIndex}`}
    >
      <Slot></Slot>
    </View>
  )
}
export default Index
