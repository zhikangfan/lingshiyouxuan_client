import {View, Text, Slot, ScrollView} from '@tarojs/components'
import {useState} from 'react'
import cs from 'classnames'
import s from './index.module.scss'

interface TabItem {
  title: string
}

interface VtabsProps {
  tabBarClass?: string,
  vtabs?: TabItem[],
  activeClass?: string,
  tabLineColor?: string,
  tabInactiveTextColor?: string,
  tabActiveTextColor?: string,
  tabInactiveBgColor?: string,
  tabActiveBgColor?: string,
  activeTab?: number,
  animation?: boolean,
  bindTabClick?: ({index}:{index: number}) => void,
  bindChange?: () => void
}

function Index(props: VtabsProps) {
  let {
    vtabs = [],
    tabBarClass = '',
    activeClass = '',
    activeTab = 0,
    tabActiveBgColor = '#ffffff',
    tabInactiveBgColor = '#eeeeee',
    tabActiveTextColor = '#ff0000',
    tabInactiveTextColor = '#000000',
    tabLineColor = '#ff0000',
    animation = true,
    bindTabClick,
    bindChange
  } = props;
  const [contentScrollTop, setContentScrollTop] = useState<number>(0)
  const [currentView, setCurrentView] = useState<number>(0)
  const [_heightRecords, set_heightRecords] = useState<Array<any>>([])
  const [_contentHeight, set_contentHeight] = useState<object>({})

  function handleContentScroll() {

  }

  function handleTabClick(index) {
    bindTabClick && bindTabClick({index: index});
  }

  return (
    <View className={s['weui-vtabs']}>
      <View className={cs(s['weui-vtabs-bar__wrp'], tabBarClass)}>
        <ScrollView
          scrollY
          className={s['weui-vtabs-bar__scrollview']}
          scrollIntoView={`weui-vtabs-item__${currentView}`}
        >
          <View className={s['weui-vtabs-bar__content']}>

            {
              vtabs.map((item, index) => (
                <View
                  id={`weui-vtabs-item__${index}`}
                  className={s['weui-vtabs-bar__item']}
                  data-index={index}
                  style={{
                    backgroundColor: activeTab === index ? tabActiveBgColor : tabInactiveBgColor,
                    color: activeTab === index ? tabActiveTextColor : tabInactiveTextColor,
                    borderLeftColor: activeTab === index ? tabLineColor : tabInactiveBgColor
                  }}
                  onTap={() => {
                    handleTabClick(index)
                  }
                  }
                >
                  <View className={cs(s['weui-vtabs-bar__title'], {[s[activeClass]]: activeTab === index})}>
                    <Text>{item.title}</Text>
                  </View>
                </View>
              ))
            }
          </View>
        </ScrollView>
      </View>
      <View className={s['weui-vtabs-content__wrp']}>
        <ScrollView
          scrollY
          className={s['weui-vtabs-content__scrollview']}
          scrollTop={contentScrollTop}
          scrollWithAnimation={animation}
          onScroll={handleContentScroll}
        >
          <View className={s['weui-vtabs-content']}>
            <Slot></Slot>
          </View>
        </ScrollView>
      </View>
    </View>

  )
}

export default Index;
