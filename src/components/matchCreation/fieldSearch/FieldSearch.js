import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

class FieldSearch extends Component {
    render() {
        return (
            <View style={styles.container} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
    }
});

module.exports = FieldSearch;