import React, { Component } from 'react';
import {Dimensions, View, TextInput, StyleSheet, Image } from 'react-native'
const MainWidth = Dimensions.get('window').width;

class header extends Component {
  render() {
    return (
      <View style={styles.searchBox}>
        <Image source={require('../images/back.png')} style={styles.goBack}></Image>
        <TextInput
          placeholder='在此输入单词或句子'
          style={styles.searchInput}
          onChangeText={(value) => this.changeTxt(value)}
          placeholderTextColor={'#9c9c9c'}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
})
export default header;