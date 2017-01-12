import React, { Component } from 'react';
import {
  DatePickerIOS,
  Dimensions,
  StyleSheet,
  View
} from 'react-native';

export default class TimePicker extends Component {
  constructor(props) {
    super(props);
    this._onTimeChange = this._onTimeChange.bind(this);

    this.state = {
      time: new Date(),
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours
    };
  }

  render() {
    return (
      <DatePickerIOS
        date={this.state.time}
        mode="time"
        timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
        onDateChange={this._onTimeChange}
        minuteInterval={10}
        />
    );
  }

  _onTimeChange = (time) => {
    this.setState({ time: time });
  };

  static get height() { return 260; }
}