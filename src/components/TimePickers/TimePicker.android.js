'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    TimePickerAndroid,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} = ReactNative;

class TimePicker extends React.Component {

    state = {
        presetHour: 4,
        presetMinute: 4,
        presetText: _formatTime(new Date().getHours(), new Date().getMinutes()),
        simpleText: 'pick a time',
    };

    showPicker = async (stateKey, options) => {
        try {
            const {action, minute, hour} = await TimePickerAndroid.open(options);
            var newState = {};
            if (action === TimePickerAndroid.timeSetAction) {
                newState[stateKey + 'Text'] = _formatTime(hour, minute);
                newState[stateKey + 'Hour'] = hour;
                newState[stateKey + 'Minute'] = minute;
            } else if (action === TimePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = this.state.presetText
                    ;
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    render() {
        return (

            <TouchableWithoutFeedback
                onPress={this.showPicker.bind(this, 'preset', {
                    hour: this.state.presetHour,
                    minute: this.state.presetMinute,
                })}>
                <Text style={styles.text}>{this.state.presetText}</Text>
            </TouchableWithoutFeedback>
        );
    }
}

function _formatTime(hour, minute) {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
}

var styles = StyleSheet.create({
    text: {
        color: 'black',
    },
});

module.exports = TimePicker;