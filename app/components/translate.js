import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import Drawer from 'react-native-drawer'
import { Button, InputItem, List, TextareaItem } from 'antd-mobile-rn';
// import { BoxShadow } from 'react-native-shadow'

import { getTranslate } from '../api/API';

export default class translate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type: null,
      lang1: '中文',
      lang2: '英文',
      value: '',
      trans: null,
      showTrans: false
    }
  }

  // 抽屉内容
  drawerContent = (
    <View style={{ flex: 1, backgroundColor: 'red' }}><Text onPress={() => { this.closeControlPanel() }} style={{ fontSize: 100 }}>抽屉的内容</Text></View>
  )
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    console.log('open', this._drawer)
    this._drawer.open()
  };
  exchangeLg = () => {
    var l1 = this.state.lang1
    var l2 = this.state.lang2
    this.setState({
      lang1: l2,
      lang2: l1
    })
  }
  getLangType = (lang1, lang2) => {
    switch (lang1, lang2) {
      case '英文', '中文':
        this.setState({
          type: 'EN2ZH_CN'
        })
        break;
      case '中文', '英文':
        this.setState({
          type: 'ZH_CN2EN'
        })
        break;
      case '日文', '中文':
        this.setState({
          type: 'JA2ZH_CN'
        })
        break;
      case '中文', '日文':
        this.setState({
          type: 'ZH_CN2JA'
        })
        break;
      case '韩文', '中文':
        this.setState({
          type: 'KR2ZH_CN'
        })
        break;
      case '中文', '韩文':
        this.setState({
          type: 'ZH_CN2KR'
        })
        break;
      default:
        break;
    }
  }
  // 翻译信息
  getTranslate = async (value) => {
    let params = {
      doctype: 'json',
    }
    const { type } = this.state
    const res = await getTranslate({ ...params, i: value, type: type });
    if (res.data.errorCode == 0) {
      if (!!res.data.translateResult[0][0]) {
        const transDes = res.data.translateResult[0][0]
        this.setState({
          trans: transDes,
          showTrans: true
        })
      }
    }
  };
  inputChange(val) {
    this.setState({
      value: val
    })
    if (val.trim() !== '') {
      this.setState({
        showTrans: true
      })
      this.getTranslate(val)
    } else {
      this.setState({
        showTrans: false
      })
    }
  }

  render() {
    const { lang1, lang2, value, trans, showTrans } = this.state
    // const shadowOpt = {
    //   width: 160,
    //   height: 170,
    //   color: "#000",
    //   border: 2,
    //   radius: 3,
    //   opacity: 0.2,
    //   x: 0,
    //   y: 3,
    //   style: { marginVertical: 5 }
    // }
    return (
      <View style={{ flex: 1, padding: 20, paddingBottom: 0 }}>
        <View style={styles.menuBox}>
          <Drawer
            side="bottom" // 抽屉方向 top／left／right／bottom
            open={false}//默认是否打开抽屉
            tapToClose={true}//点击内容处 会关闭抽屉
            type='overlay' //抽屉出现的方式：overlay：抽屉覆盖内容 static:抽屉一只在内容后面 打开的时内容会滑动，displace：不会覆盖的 进出
            openDrawerOffset={0.6} // 抽屉占整个屏幕的百分比（1-0.6=0.4）
            closedDrawerOffset={0}//关闭抽屉后 抽屉在屏幕中的显示比例
            styles={styles.drawer}//抽屉样式，背景色 透明度，阴影啥的
            ref={(ref) => this._drawer = ref}
            content={
              <View style={{ backgroundColor: 'red' }}><Text onPress={() => { this.closeControlPanel() }} style={{ fontSize: 100 }}>抽屉的内容</Text></View>
            }
          >
            <View style={{}}>
              <View style={styles.flexBox}>
                <Text onPress={() => { this.openControlPanel() }}>{lang1}</Text>
                <Text onPress={() => { this.exchangeLg() }}>⇆</Text>
                <Text onPress={() => { this.openControlPanel() }}>{lang2}</Text>
              </View>
            </View>
            {/* <BoxShadow setting={shadowOpt}> */}
            <View style={styles.inputBox}>
              <TextareaItem
                placeholder="在此输入要翻译的文本"
                clear
                rows={5}
                style={{ paddingVertical: 5, }}
                value={value}
                onChange={(value) => this.inputChange(value)}
              />
              {!!trans && showTrans &&
                <View style={styles.transBox}>
                  <Text numberOfLines={4} style={styles.transTxt}>{trans.tgt}</Text>
                  {/* <Image source={require('../images/gothrough.png')}></Image> */}
                </View>
              }
            </View>
            {/* </BoxShadow> */}
          </Drawer>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  menuBox: {
    flex: 1
  },
  flexBox: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputBox: {
    marginTop: 8,
    borderColor: '#eeefff',
    borderBottomWidth: 3
  },
  transBox: {
    height: 120,
    borderColor: '#eee',
    borderTopWidth: 1,
  },
  transTxt: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 18
  },
  drawer: {
    flex: 1,
    backgroundColor: '#000',
    shadowColor: '#0000ff',
    opacity: 0.6,
    shadowRadius: 3
  },
})
