import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity } from 'react-native';
//https://github.com/stephy/CalendarPicker
import CalendarPicker from 'react-native-calendar-picker';
import TimePicker from '../TimePickers/TimePicker';

class DateTimePanel extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this._renderDetail = this._renderDetail.bind(this);
        this._onDateChange = this._onDateChange.bind(this);
        this._getDDMMYYYDate = this._getDDMMYYYDate.bind(this);
        this._getHHMMDate = this._getHHMMDate.bind(this);
        this._onTimeChange = this._onTimeChange.bind(this);

        this.state = {
            expanded: false,
            animation: new Animated.Value(),
            show: 'nada aun',
            date: new Date(),
            dateTime: new Date(),
            minHeight: 37,
            //maxDateHeight: 0.91 * Dimensions.get('window').width,
            //maxTimeHeight: 0.78 * Dimensions.get('window').width
            maxDateHeight: 0.52 * Dimensions.get('window').height,
            maxTimeHeight: 0.78 * TimePicker.height
        };
    }

    toggle(prevState) {
        let initialValue;
        if (!this.state.expanded) {
            initialValue = this.state.minHeight;
        } else {
            initialValue = this.state.prev == 'CALENDAR' ? this.state.maxDateHeight : initialValue = this.state.maxTimeHeight;
        }

        let finalValue;

        if (!this.state.expanded) {
            finalValue = this.state.show == 'CALENDAR' ? this.state.maxDateHeight : this.state.maxTimeHeigh;
        } else {
            if (this.state.prev == this.state.show) {
                finalValue = this.state.minHeight;
            } else {
                finalValue = this.state.show == 'CALENDAR' ? this.state.maxDateHeight : this.state.maxTimeHeigh;
            }
        }

        console.log("prevState:" + JSON.stringify(prevState));
        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();

        if (!this.state.expanded) {
            this.setState({
                expanded: true
            });
        } else {
            this.setState({
                expanded: this.state.prev != this.state.show
            });
        }
    }

    _onDateChange(date) {
        this.setState({ date: date });
    };

    _onTimeChange = (date) => {
        this.setState({ date: date });
    };

    _onPressDate() {

    }
    _onPressTime() {

    }

    _renderDetail() {
        if (!this.state.expanded)
            return;
        if (this.state.show == 'CALENDAR') {
            return (
                <View style={styles.body} onLayout={this._setMaxHeight} >
                    <CalendarPicker
                        selectedDate={this.state.date}
                        onDateChange={this._onDateChange}
                        screenWidth={Dimensions.get('window').width}
                        selectedBackgroundColor={'#5ce600'} />
                </View>
            );
        } else {
            return (
                <View style={styles.body} onLayout={this._setMaxHeight} >
                    <TimePicker onLayout={(height) => this.setState({ maxTimeHeight: height })} />
                </View>
            );
        }
    }

    render() {
        return (
            <Animated.View style={[styles.container, { height: this.state.animation }]}>
                <View style={styles.titleContainer} >
                    <Text style={styles.title} onPress={() => this.setState({ prev: this.state.show, show: 'CALENDAR' }, this.toggle)} >
                        {this._getDDMMYYYDate()}
                    </Text>
                    <Text style={styles.title} onPress={() => this.setState({ prev: this.state.show, show: 'CLOCK' }, this.toggle)} >
                        {this._getHHMMDate()}
                    </Text>
                </View>
                {this._renderDetail()}
            </Animated.View>
        );
    }

    _getHHMMDate() {
        return this.state.dateTime.getHours() + ':' +
            this.state.dateTime.getMinutes()
    }

    _getDDMMYYYDate() {
        return this.state.date.getDate() + '/' +
            (this.state.date.getMonth() + 1) + '/' +
            this.state.date.getFullYear()
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        overflow: 'hidden',
        padding: 10
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
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
    }
});

module.exports = DateTimePanel;