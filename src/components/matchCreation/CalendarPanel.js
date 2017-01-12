import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated
} from 'react-native';

export default class CalendarPanel extends Component {
  constructor(props) {
    super(props);

    this._setMinHeight = this._setMinHeight.bind(this);
    this._setMaxHeight = this._setMaxHeight.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      title: props.title,
      expanded: true,
      animation: new Animated.Value()
    };
  }

  toggle() {
    let sumValues = this.state.maxHeight + this.state.minHeight;
    let initialValue = this.state.expanded ? sumValues : this.state.minHeight;
    let finalValue = this.state.expanded ? this.state.minHeight : sumValues;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, { height: this.state.animation }]}>
        <View style={styles.titleContainer} onLayout={this._setMinHeight} >
          <Text style={styles.title} onPress={this.toggle}>{this.state.title}</Text>
          <TouchableHighlight style={styles.button} underlayColor="#f1f1f1">
            <Text />
          </TouchableHighlight>
        </View>
        <View style={styles.body} onLayout={this._setMaxHeight}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold'
  },
  button: {

  },
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});