import { View, Text, Textarea } from '@tarojs/components'
import cs from 'classnames'
import { useState } from 'react'
import s from './index.module.scss'

interface Remark {
  text: string
}

function Remarks() {
  const [quick_input] = useState<Array<Remark>>([
    {
      text: '请及时准备，我会按时来取'
    },
    {
      text: '请给我送到怀化学院南门，谢谢'
    },
    {
      text: '请给我送到怀化学院后门，thank you'
    },
    {
      text: '麻烦给我送至党校门口'
    },
    {
      text: '给我送到职业学院宿舍门口'
    }
  ])
  const [textLength, setTextLength] = useState<number>(0)
  const [maxTextLength] = useState<number>(48)
  const [content, setContent] = useState<string>('')
  const [current_select, setCurrentSelect] = useState<number>(-1)

  function selectQuickInput(item: Remark, index: number): void {
    setContent(item.text)
    setCurrentSelect(index)
    setTextLength(item.text.length)
  }

  function jumpOrder() {}

  function changeInput(e) {
    setTextLength(e.detail.cursor)
  }

  return (
    <>
      <View className={s['page-container']}>
        <View className={s['content-box']}>
          <Textarea
            className={s.content}
            name="content"
            maxlength={maxTextLength}
            value={content}
            onInput={changeInput}
            placeholder="可备注信息，如几点取东西，偏好口味等"
          ></Textarea>
          <Text className={s['text-counts']}>
            {textLength}/{maxTextLength}
          </Text>
        </View>
        <View className={s['recommend-box']}>
          <View className={s.title}>快捷输入</View>
          <View className={s['recommend-list']}>
            {quick_input.map((item, index) => (
              <View
                className={s['recommend-item']}
                onTap={() => {
                  selectQuickInput(item, index)
                }}
              >
                <Text>{item.text}</Text>
                <View
                  className={cs('iconfont', 'icon-duihao1', s.iconfont, {
                    [s.show]: current_select === index
                  })}
                ></View>
              </View>
            ))}
          </View>
        </View>
        <View className={s['fixed-container']}>
          <View className={s.btn} onTap={jumpOrder}>
            确认
          </View>
        </View>
      </View>
    </>
  )
}

export default Remarks
