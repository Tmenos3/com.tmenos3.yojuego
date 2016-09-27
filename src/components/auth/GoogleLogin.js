import React, { Component } from 'react';
import {
    StyleSheet,
    WebView,
    Text
} from 'react-native';
import NavigationsActions from '../../actions/NavigationsActions';
import NavigationConstants from '../../constants/NavigationConstants';
import RouteConstants from '../../constants/RouteConstants';
import SessionActions from '../../actions/SessionActions';

class GoogleLogIn extends Comment {
    render() {
        return (
            <WebView onNavigationStateChange={this._onLoad} style={styles.container} source={{ uri: 'http://ec2-54-174-177-82.compute-1.amazonaws.com:8081/auth/facebook' }}/>
        );
    }

    _onLoad(state) {
        console.log(state.url);
        if (state.url.indexOf('http://ec2-54-174-177-82.compute-1.amazonaws.com:8081/auth/success') != -1) {
            var token = state.url.split("token+")[1];
            SessionActions.setSession({ token: token });
            NavigationsActions.back();
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = GoogleLogIn;