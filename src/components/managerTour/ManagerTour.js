import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Swiper from 'react-native-swiper'

class ManagerTour extends Component {
    render() {
        return (
            <Swiper style={styles.container} showsButtons={false}>
                <View style={styles.slide}>
                    <Text style={styles.text}>Publica tus canchas</Text>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.text}>Mostra todo lo bueno que tienen</Text>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.text}>Administra las reservas fácil y sin problemas</Text>
                </View>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontSize: 100,
        textAlign: 'center'
    }
});

module.exports = ManagerTour;