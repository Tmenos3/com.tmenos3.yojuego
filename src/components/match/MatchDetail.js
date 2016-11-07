import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import MatchDetailHeader from './MatchDetailHeader';
import MatchDetailBody from './MatchDetailBody';

class MatchDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <MatchDetailHeader />
                <MatchDetailBody />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    }
});

module.exports = MatchDetail;
