import React, { Component } from 'react';
import { Dimensions, View, Text, TextInput, StyleSheet, Image, FlatList, TouchableHighlight } from 'react-native';

import WordCard from './wordCard_antd';
import { getWords, getWordDetail } from '../api/API';

const MainWidth = Dimensions.get('window').width;
class search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'search',
      showList: false,
      showDetail: false,
      showDelete: false,
      dataSource: null,
      value: '',
      notFound: false,
      wordDetail: []
    }
  }

  // 输入单词联想
  getWordsList = async (value) => {
    let params = {
      le: 'eng',
      num: 10,
      doctype: 'json',
    }
    const res = await getWords({ ...params, q: value });
    if (!!res.data.data) {
      if (Object.keys(res.data.data).length !== 0) {
        this.setState({
          dataSource: res.data.data.entries,
          notFound: false
        })
      } else {
        this.setState({
          notFound: true
        })
      }
    }
  };
  // 单词详情
  getWordsDetail = async (value) => {
    let params = {
      jsonversion: 2,
    }
    const res = await getWordDetail({ ...params, q: value });
    if (!!res.data) {
      this.setState({
        wordDetail: res.data,
        showDetail: true
      })
    }
  };
  goback() {
    const { navigation } = this.props
    console.log(navigation, 'navigation')
  }
  deleteText() {
    this.setState({
      value: '',
      showList: false,
      showDelete: false,
      showDelete: false
    })
  }
  onPressWord(data) {
    this.getWordsDetail(data.entry)
    this.setState({
      showList: false,
      showDetail: true,
      showDelete: true
    })
  }
  renderItem = ({ item }) => (
    <TouchableHighlight onPress={this.onPressWord.bind(this, item)} underlayColor={'rgba(238,238,238,0.33)'}>
      <View style={styles.listItem}>
        <Text style={styles.word}>{item.entry}</Text>
        <Text style={styles.explain} numberOfLines={2}>{item.explain}</Text>
        <Text style={styles.trans}>英汉</Text>
      </View>
    </TouchableHighlight>
  );
  focusInput() {
    if (this.state.value !== '') {
      this.setState({
        showDelete: true
      })
    }
  }
  changeTxt(val) {
    this.setState({
      showDetail: false,
      showDelete: true,
      value: val
    })
    if (val !== '') {
      this.setState({
        showList: true
      })
      this.getWordsList(val)
    } else {
      this.setState({
        showList: false
      })
    }
  }
  render() {
    const { dataSource, showList, notFound, wordDetail, showDetail, value, showDelete } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableHighlight onPress={this.goback}>
              <Image source={require('../images/back.png')} style={styles.goBack}></Image>
            </TouchableHighlight>
            <TextInput
              placeholder='在此输入单词或句子'
              style={styles.searchInput}
              onChangeText={(value) => this.changeTxt(value)}
              placeholderTextColor={'#9c9c9c'}
              value={value}
              onFocus={this.focusInput.bind(this)}
            />
          </View>
          <TouchableHighlight onPress={this.deleteText.bind(this)} underlayColor={'rgba(0,0,0,0)'}>
            <View>
              {showDelete &&
                <Image source={require('../images/delete.png')} style={styles.deleteBtn}></Image>
              }
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.associate}>
          {dataSource && dataSource.length !== 0 && showList &&
            <View style={styles.listView}>
              {notFound && <View style={{ height: 80, justifyContent: 'center' }}><Text style={{ textAlign: 'center' }}> 暂无此词~ </Text></View>}
              {!notFound && <FlatList
                data={dataSource}
                renderItem={this.renderItem}
                ItemSeparatorComponent={() => (<View style={{ alignItems: 'center' }}><View style={{ height: 2, width: MainWidth * 0.84, backgroundColor: 'rgba(238,238,238,0.4)' }}></View></View>)}
              />}
            </View>
          }
        </View>
        {wordDetail.length !== 0 && showDetail &&
          <View style={styles.detailBox}>
            <View>
              <WordCard item={wordDetail} />
            </View>
          </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  searchBox: {
    flex: 0,
    width: MainWidth * 0.9,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eeeeee',
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  goBack: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  searchInput: {
    width: 280
  },
  deleteBtn: {
  },
  listView: {
    width: MainWidth * 0.9,
    marginTop: 14,
    // shadowColor: 'rgba(0,0,0,.35)',
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#eeeeee',
    backgroundColor: '#ffffff'
  },
  listItem: {
    marginHorizontal: 18,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  word: {
  },
  explain: {
    flex: 1,
    color: '#9c9c9c',
    marginLeft: 20,
  },
  trans: {
    flex: 0,
    width: 60,
    height: 26,
    justifyContent: 'center',
    marginLeft: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    textAlign: 'center',
    color: '#dddddd'
  },
  detailBox: {
    // width: MainWidth * 0.9
  }
})
export default search;