import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Drawer from 'react-native-drawer'

class translate extends Component {

  constructor(props) {
    super(props)
    this.state = {
      type: '',
      lang1: '中文',
      lang2: '英文',
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
  getLangType = (lang1,lang2) => {
    switch (lang1,lang2) {
      case value:
        
        break;
    
      default:
        break;
    }
  }
  render() {
    const { lang1, lang2 } = this.state
    return (
      <View style={{ flex: 1 }}>
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
            content={<View style={{ backgroundColor: 'red' }}><Text onPress={() => { this.closeControlPanel() }} style={{ fontSize: 100 }}>抽屉的内容</Text></View>}
          >
            <View style={{ backgroundColor: '#eee' }}>
              <View style={styles.flexBox}>
                <Text onPress={() => { this.openControlPanel() }}>{lang1}</Text>
                <Text onPress={() => { this.exchangeLg() }}>⇆</Text>
                <Text onPress={() => { this.openControlPanel() }}>{lang2}</Text>
              </View>
            </View>
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
  drawer: {
    flex: 1,
    backgroundColor: '#000',
    shadowColor: '#0000ff',
    opacity: 0.6,
    shadowRadius: 3
  },
})

export default translate;