import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    TextInput,
    View,
    StyleSheet,
    Dimensions,
    Platform,
    Image,
    ActivityIndicator
} from 'react-native';
import NavigationsActions from '../actions/NavigationsActions';
import NavigationConstants from '../constants/NavigationConstants';
import RouteConstants from '../constants/RouteConstants';
import MatchStore from '../stores/MatchStore';
import MatchActions from '../actions/MatchActions';

class MatchDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        }

        //this._onMatchChange = this._onMatchChange.bind(this);
    }

    componentDidMount() {
        //MatchStore.addChangeListener(this._onMatchChange);
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.facebookButtton} onPress={this._showFacebookLogin}>
                    <Text style={styles.buttonText}>Facebook</Text>
                    <Image style={styles.facebookImage} source={require('../statics/facebook-logo-white.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButtton} onPress={this._showGoogleLogin}>
                    <Text style={styles.buttonText}>Google+</Text>
                    <Image style={styles.googleImage} source={require('../statics/google-plus-logo-white.png')}></Image>
                </TouchableOpacity>
                <View style={styles.line}></View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={"Email"}
                        style={styles.input}
                        onChangeText={this._onEmailTextChanged}
                        text={this.state.email}
                        />
                </View>
                <View style={[styles.inputContainer, {
                    borderTopWidth: 0,
                    marginBottom: Dimensions.get('window').width * 0.06
                }]}>
                    <TextInput
                        placeholder={"Contraseña"}
                        style={styles.input}
                        onChangeText={this._onPasswordTextChanged}
                        text={this.state.password}
                        />
                </View>
                <View style={styles.loginContainer}>
                    <TouchableOpacity onPress={this._forgetPassword}>
                        <Text style={styles.text}>Olvide mi contraseña...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton} onPress={this._onLoginPressed}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.signUp} onPress={this._showSignUp}>
                    <Text style={styles.text}>{'No tengo cuenta! Quiero Registrarme'}</Text>
                </TouchableOpacity>
                {this._renderLoading()}
            </View>
        );
    }

    _renderLoading() {
        if (this.state.loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator animating={true} size='large' />
                </View>
            )
        }
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
