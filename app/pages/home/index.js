import React, { Component } from 'react';
import { Dimensions, View, Text, TextInput, StyleSheet, Image, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { TabBar } from 'antd-mobile-rn';

// import Header from '../../components/header'
import WordCard from '../../components/wordCard_antd';
import Search from '../../components/search'
import Translate from '../../components/translate'

import { getWords, getWordDetail } from '../../api/API';

const MainWidth = Dimensions.get('window').width;

class index extends Component {
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

  componentDidMount() {
  }

  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
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
    return (
      <TabBar
        tintColor="#BE3030"
        unselectedTintColor="#707070"
      >
        <TabBar.Item
          title="词典"
          icon={require('../../images/tabbar/search_ant.png')}
          selectedIcon={require('../../images/tabbar/search.png')}
          selected={this.state.selectedTab === 'search'}
          onPress={() => this.onChangeTab('search')}
        >
          {this.state.selectedTab === 'search' &&
            <Search/>
          }
        </TabBar.Item>
        <TabBar.Item
          title="翻译"
          icon={require('../../images/tabbar/trans_ant.png')}
          selectedIcon={require('../../images/tabbar/trans.png')}
          selected={this.state.selectedTab === 'trans'}
          onPress={() => this.onChangeTab('trans')}
        >
        {this.state.selectedTab === 'trans' &&
          <Translate/>
        }
        </TabBar.Item>
      </TabBar>

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

export default index;