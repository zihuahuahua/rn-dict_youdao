import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image,ScrollView } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';

const MainWidth = Dimensions.get('window').width;

class wordCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swiperArr: null
    }
  }
  componentWillMount() {
    const { item } = this.props
    let arr = []
    if (!!item.ec) {
      arr.push('简明')
    }
    if (!!item.longman) {
      arr.push('朗文')
    }
    if (!!item.collins) {
      arr.push('柯林斯')
    }
    if (!!item.ec21) {
      arr.push('21世纪大英汉')
    }
    this.setState({
      swiperArr: arr
    })
  }

  render() {
    const { simple, ec, pic_dict, blng_sents_part, longman, collins, wikipedia_digest } = this.props.item
    const { swiperArr } = this.state
    if (!!longman) {
      var longwenSense = longman.wordList[0].Entry.Sense[0]
      var longwenHead = longman.wordList[0].Entry.Head[0]
    }
    if (!!collins) {
      var KSL = collins.collins_entries[0].entries.entry[0].tran_entry[0]
    }
    return (
      <ScrollView>
        <View style={styles.top}>
          <View style={{ width: MainWidth * 0.6 }}>
            <Text style={styles.word}>{simple.query}</Text>
            <View style={styles.yinbiao}>
              {!!simple.word[0].phone && simple.word[0].phone !== '' &&
                <Text style={styles.symbol}>/<Text>{simple.word[0].phone}</Text>/</Text>
              }
              <View style={{ flexDirection: 'row' }}>
                {!!simple.word[0].ukphone && simple.word[0].ukphone !== '' &&
                  <Text style={styles.symbol}>英/<Text>{simple.word[0].ukphone}</Text>/</Text>
                }
                {!!simple.word[0].usphone && simple.word[0].usphone !== '' &&
                  <Text style={styles.symbol}>美/<Text>{simple.word[0].usphone}</Text>/</Text>
                }
              </View>
            </View>
          </View>
          {pic_dict && pic_dict.pic &&
            <View style={styles.pics}>
              <Image source={{ uri: pic_dict.pic[0].url }}></Image>
            </View>
          }
        </View>
        <View style={styles.scrollBox}>
          <ScrollableTabView
            tabBarUnderlineColor="#000000"
            tabBarActiveTextColor="#BE3030"
            renderTabBar={() => (
              <TabBar
                underlineColor="#BE3030"
                activeTabTextStyle={{ color: "#000000", fontWeight: '500' }}
                tabBarTextStyle={{ color: 'rgba(0,0,0,0.8)' }}
                tabMargin={30}
              />
            )}
          >
            {swiperArr && swiperArr.map((i, v) => {
              return (
                <View tabLabel={{ label: i }} label={i} key={v}>
                  <View style={{ marginTop: 8 }}>
                    {i == '简明' &&
                      <View style={styles.ecs}>
                        <View style={styles.ecBox}>
                          {ec.word[0].trs && ec.word[0].trs.map((i, v) => {
                            console.log(i.tr[0].l.i[0])
                            return (
                              <View style={styles.ec} key={v}>
                                <Text>{i.tr[0].l.i[0]}</Text>
                              </View>)
                          })}
                        </View>
                        {!!blng_sents_part &&
                          <View style={styles.example}>
                            <Text style={{ color: '#777777', fontWeight: '700' }}>经典例句</Text>
                            {!!blng_sents_part && !!blng_sents_part['sentence-pair'] &&
                              <View style={styles.sentenceBox}>
                                {/* <Text style={{}}>双语</Text> */}
                                {blng_sents_part['sentence-pair'].map((i, v) => {
                                  return (
                                    <View style={styles.sentence} key={v}>
                                      <Text>{i['sentence']}</Text>
                                      <Text style={{ marginTop: 8 }}>{i['sentence-translation']}</Text>
                                    </View>)
                                })}
                              </View>
                            }
                          </View>
                        }
                        {!!wikipedia_digest &&
                          <View style={styles.wikiBox}>
                            <Text style={{ color: '#777777', fontWeight: '700' }}>百科</Text>
                            <View>
                              <Text style={{ color: '#BE3030', fontSize: 18, marginRight: 10 }}>{wikipedia_digest.summarys[0].key}</Text>
                              <Text>{wikipedia_digest.summarys[0].summary}</Text>
                            </View>
                          </View>
                        }
                      </View>
                    }
                    {i == '朗文' && !!longman.wordList[0].Entry.Sense &&
                      <View style={styles.langwenBox}>
                        <View style={styles.HeadLW}>
                          <Text style={{ color: '#BE3030', fontSize: 18, marginRight: 10 }}>{longwenHead.HWD[0]}</Text>
                          <Text>/{longwenHead.PronCodes[0].PRON}/</Text>
                          <Text>英 /{longwenHead.PronCodes[0].PRONKK}/</Text>
                        </View>
                        <View style={styles.sentenceLW}>
                          <Text style={{ color: '#000', fontWeight: '700' }}>{longwenSense.FULLFORM}</Text>
                          <Text style={{ color: '#000' }}>{longwenSense.DEF}{longwenSense.TRAN}</Text>
                          <View style={styles.small}>
                            <Text style={styles.greyFont}>{longwenSense.EXAMPLE}</Text>
                            <Text style={styles.greyFont}>{longwenSense.EXAMPLETRAN}</Text>
                          </View>
                        </View>
                      </View>
                    }
                    {i == '柯林斯' && !!collins.collins_entries[0] &&
                      <View style={styles.langwenBox}>
                        <View style={styles.wordKLS}>
                          <Text style={{ color: '#BE3030', fontSize: 18, marginRight: 10 }}>{collins.collins_entries[0].headword}</Text>
                          <Text>/{collins.collins_entries[0].phonetic}/</Text>
                        </View>
                        <View style={styles.sentenceKSL}>
                          <Text>{KSL.tran}</Text>
                          <View style={styles.explainKSL}>
                            <Text style={styles.greyFont}>{KSL.exam_sents.sent[0].eng_sent}</Text>
                            <Text style={styles.greyFont}>{KSL.exam_sents.sent[0].chn_sent}</Text>
                          </View>
                        </View>
                      </View>
                    }
                  </View>
                </View>
              )
            })}
          </ScrollableTabView>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  word: {
    fontSize: 34,
    color: '#000',
  },
  yinbiao: {
    marginTop: 8
  },
  symbol: {
    minWidth: 80
  },
  pics: {
    width: MainWidth * 0.3
  },
  scrollBox: {
    // height: 800,
    // flex:1,
    marginTop: 100
  },
  ecs: {
    width: MainWidth * 0.9,
  },
  ecBox: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  ec: {
    width: 400,
  },
  example: {
    width: MainWidth * 0.9,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sentenceBox: {
    marginTop: 20,
    paddingHorizontal: 25
  },
  sentence: {
    marginVertical: 25,
    width: 300
  },
  langwenBox: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  greyFont: {
    color: '#ccc',
    fontSize: 12
  },
  wordKLS: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sentenceKSL: {
    marginTop: 25,
    width: MainWidth * 0.7
  },
  explainKSL: {
    width: MainWidth * 0.4,
    marginTop: 25
  }
})
export default wordCard;