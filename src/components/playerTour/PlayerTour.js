import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Swiper from 'react-native-swiper'

class PlayerTour extends Component {
    render() {
        return (
            <Swiper style={styles.container} showsButtons={false}>
                <View style={styles.slide}>
                    <Text style={styles.text}>Elegi la fecha</Text>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.text}>Busca una cancha</Text>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.text}>Invita a tus amigos</Text>
                </View>
                <View style={styles.slide}>
                    <Text style={styles.text}>Reservala al toque roque</Text>
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

module.exports = PlayerTour;