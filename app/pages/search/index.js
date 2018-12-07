import React, { Component } from 'react';
import { Dimensions, View, Text, TextInput, StyleSheet, Image, ScrollView, FlatList, TouchableHighlight } from 'react-native'
// import Header from '../../components/header'
import WordCard from '../../components/wordCard'
import { getWords, getWordDetail } from '../../api/API'
const MainWidth = Dimensions.get('window').width;
class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showList: false,
      showDetail: false,
      dataSource: null,
      notFound: false,
      wordDetail: []
    }
  }

  componentDidMount() {
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
  // 
  getWordsDetail = async (value) => {
    let params = {
      jsonversion: 2,
    }
    const res = await getWordDetail({ ...params, q: value });
    console.log(res, 'resDatata')
    if (!!res.data) {
      this.setState({
        wordDetail: res.data,
        showDetail: true
      })
    }
  };
  onPressWord(data) {
    this.getWordsDetail(data.entry)
    this.setState({
      showList: false,
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
  changeTxt(val) {
    // this.setState({
    //   value: val
    // })
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
    const { dataSource, showList, notFound, wordDetail,showDetail } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <Image source={require('../../images/back.png')} style={styles.goBack}></Image>
          <TextInput
            placeholder='在此输入单词或句子'
            style={styles.searchInput}
            onChangeText={(value) => this.changeTxt(value)}
            placeholderTextColor={'#9c9c9c'}
          />
        </View>
        {/* <View style={styles.scrollView}>
          <ScrollView horizontal={true} >
            <Text>英汉</Text>
            <Text>汉英</Text>
            <Text>日汉</Text>
            <Text>汉日</Text>
          </ScrollView>
        </View> */}
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
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  searchBox: {
    flex: 0,
    width: MainWidth * 0.9,
    paddingHorizontal: 15,
    flexDirection: 'row',
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
    // width: 80
  },
  explain: {
    // width:350,
    flex: 1,
    color: '#9c9c9c',
    marginLeft: 20,
  },
  trans: {
    flex: 0,
    width: 60,
    height: 26,
    // lineHeight: 26,
    justifyContent: 'center',
    marginLeft: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    textAlign: 'center',
    color: '#dddddd'
  }
})

export default index;