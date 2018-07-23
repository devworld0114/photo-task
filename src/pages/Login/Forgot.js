import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { emailChanged, passwordChanged, sendResetLink } from '../../actions';
import { Input, Button } from '../../components';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


class Forgot extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onButtonPress() {
        const {email} = this.props;
        this.props.sendResetLink({
            email,
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


    openLogin() {
        console.log("Open login!");
        Actions.login();
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

                <View style={{width: '100%', height: 30}}>
                    {this.renderError()}
                </View>

                <Input
                    style={[styles.input, {marginBottom: 30}]}
                    icon={require('../../../assets/icons/email.png')}
                    placeholder="email@gmail.com"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email} />

                <View style={{width: '80%', alignSelf: 'center', justifyContent: 'center'}}>
                    <Button loading={this.props.loading} onPress={this.onButtonPress.bind(this)}>
                        RESET PASSWORD
                    </Button>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20, width: '80%'}}>
                    <TouchableOpacity onPress={() => this.openLogin()}>
                        <Text style={styles.login}>Go To Login</Text>
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
        color: '#835fff',
        textAlign: 'center',
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

    login: {
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
    sendResetLink,
})(Forgot);