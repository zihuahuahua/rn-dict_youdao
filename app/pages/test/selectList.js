import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import ListViewSelect from 'react-native-list-view-select';
import _ from 'lodash';

export default class ListViewSelectExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: "Select Item",
      isVisible: false,
    };
    _.bindAll(this, ['showPopover', 'closePopover', 'setItem']);
  }

  showPopover() {
    this.setState({ isVisible: true });
  }

  closePopover() {
    this.setState({ isVisible: false });
  }

  setItem(item) {
    console.log(item, 'item===')
    this.setState({ item: item });
  }

  render() {
    const { selectedCity } = this.props;
    const items = [
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
    ];
    const { item, isVisible } = this.state
    console.log(item, isVisible,'render')
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.showPopover}>
          <Text>{item}</Text>
        </TouchableHighlight>
        <ListViewSelect
          list={items}
          isVisible={isVisible}
          onClick={this.setItem}
          onClose={this.closePopover}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingBottom: 100,
  },
});