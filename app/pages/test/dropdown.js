import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';

var data = [["C", "Java", "JavaScript", "PHP"]];
export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  handleChose(selection, row) {
    this.setState({
      text: data[selection][row]
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <DropdownMenu
          style={{ flex: 0, width: 120 }}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          // arrowImg={}      
          // checkImage={}   
          // optionTextStyle={{color: '#333333'}}
          // titleStyle={{color: '#333333'}} 
          // maxHeight={300} 
          handler={(selection, row) => this.handleChose(selection, row)}
          data={data}
        >

          <View style={{ flex: 1 }}>
            <Text>
              {this.state.text} is the best language in the world
            </Text>
          </View>

        </DropdownMenu>
      </View>
    );
  }

}