import React, { Component } from 'react';
import { Dimensions, View, Text, TextInput, StyleSheet, Image, ScrollView, FlatList, TouchableHighlight } from 'react-native';

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
    const { simple, ec, pic_dict, blng_sents_part, auth_sents_part, media_sents_part } = this.props.item
    const { swiperArr } = this.state
    return (
      <View>
        <View style={styles.top}>
          <View style={{ width: MainWidth * 0.6 }}>
            <Text style={styles.word}>{simple.query}</Text>
            <View style={styles.yinbiao}>
              {simple.word[0].phone && simple.word[0].phone !=='' &&
                <View style={styles.symbol}><Text>/</Text><Text>{simple.word[0].phone}</Text><Text>/</Text></View>
              }
              <View style={{ flexDirection: 'row' }}>
                {simple.word[0].ukphone && simple.word[0].ukphone !=='' &&
                  <View style={styles.symbol}><Text>英/</Text><Text>{simple.word[0].ukphone}</Text><Text>/</Text></View>
                }
                {simple.word[0].usphone && simple.word[0].usphone !=='' &&
                  <View style={styles.symbol}><Text>美/</Text><Text>{simple.word[0].usphone}</Text><Text>/</Text></View>
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
                tabBarTextStyle={{ color: '#eeeeee' }}
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
                        {ec.word[0].trs && ec.word[0].trs.map((i, v) => {
                          console.log(i.tr[0].l.i[0])
                          return (
                            <View style={styles.ec} key={v}>
                              <Text>{i.tr[0].l.i[0]}</Text>
                            </View>)
                        })}

                        {(media_sents_part || blng_sents_part || auth_sents_part) &&
                          <View style={styles.example}>
                            <Text>经典例句</Text>
                            {blng_sents_part &&
                              <View style={styles.sentenceBox}>
                                {blng_sents_part['sentence-pair'].map((i, v) => {
                                  <View style={styles.sentence}>
                                    {/* <Text>{i}</Text> */}
                                    {/* <Text>{i['sentence-translation']}</Text> */}
                                  </View>
                                })}
                              </View>
                            }
                          </View>
                        }
                      </View>}
                    {i == '朗文' &&
                      <View>

                      </View>
                    }
                  </View>
                </View>
              )
            })}
          </ScrollableTabView>
        </View>
      </View>
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
    fontSize: 24,
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
    height: 100
  }
})
export default wordCard;