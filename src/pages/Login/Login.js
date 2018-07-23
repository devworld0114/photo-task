import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import { Input, Button } from '../../components';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';


class Login extends Component {

    constructor() {
        super()

        this.flag = false
        firebase.auth().onAuthStateChanged(user => {
            if(user && !this.flag) {
                this.props.loginUser()
                this.flag = true
            }
        })
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const {email, password} = this.props;
        if(this.props.loading) {
            return;
        }

        this.props.loginUser({
            email,
            password
        });
    }

    renderError() {
        if (this.props.error) {
            return (
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
            );
        }
    }

    openForgot() {
        console.log("Open Forgot!");
        Actions.forgot();
    }

    openSignUp() {
        console.log("Open SignUp!");
        this.props.emailChanged('');
        this.props.passwordChanged('');
        Actions.signup();
    }

    render() {
        let bg = require('../../../assets/imgs/login_bg2.jpg');
        let logo = require('../../../assets/imgs/logo.png');

        return (
            <View style={styles.container}>
                <Image source={bg} style={[styles.fillFixed, {resizeMode: 'stretch'}]} />
                <View style={[styles.fillFixed, {backgroundColor: '#003300CC'}]} />

                <View style={{paddingBottom: 30}}>
                    <View style={styles.logo}>
                        <Image source={logo} style={{width: '100%', height: '100%'}} />
                    </View>
                    <Text style={styles.logoTitle}>Photo Mix</Text>
                </View>

                <View style={{width: '100%', height: 50}}>
                    {this.renderError()}
                </View>

                <Input
                    style={[styles.input, {marginBottom: 30}]}
                    icon={require('../../../assets/icons/email.png')}
                    placeholder="email@gmail.com"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email} />

                <Input
                    style={[styles.input,{marginBottom: 40}]}
                    icon={require('../../../assets/icons/lock.png')}
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value= {this.props.password} />

                <View style={{width: '80%', alignSelf: 'center', justifyContent: 'center'}}>
                    <Button loading={this.props.loading} onPress={this.onButtonPress.bind(this)}>
                        LOG IN
                    </Button>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, width: '95%'}}>
                    <TouchableOpacity onPress={() => this.openSignUp()}>
                        <Text style={styles.forgot}>Create Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.openForgot()}>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 18,
        color: '#333333',
        textAlign: 'center',
        width: '100%',
    },

    input: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    errorTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        color: '#835fff',
        fontWeight: '500',
    },

    fillFixed: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },

    logo: {
        backgroundColor: '#FFFFFFAA',
        width: 120,
        height: 120,
        borderRadius: 60,
    },

    logoTitle: {
        color: 'white',
        padding: 10,
        fontSize: 20,
    },

    forgot: {
        color: '#EEE',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser
})(Login);