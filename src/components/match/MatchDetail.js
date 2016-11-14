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

        this.state = {
            match: props.match
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MatchDetailHeader match={this.state.match} />
                <MatchDetailBody match={this.state.match} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    }
});

module.exports = MatchDetail;
