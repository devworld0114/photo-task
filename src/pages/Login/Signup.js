import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { emailChanged, passwordChanged, signupUser, avatarChanged, nameChanged, errorOccurred } from '../../actions';
import { Input, Button, Spinner } from '../../components';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-picker';
import { CachedImage } from 'react-native-cached-image';
const firebase = require('firebase');


class Signup extends Component {

    state = {
        uploading: false
    };

    onNameChange(text) {
        this.props.nameChanged(text);
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onAvatarChange(uri) {
        this.props.avatarChanged(uri);
    }

    openLibrary() {
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        
        ImagePicker.showImagePicker(options, (response) => {          
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({uploading: true});
                let uri = response.uri;

                // Resize image to smaller version
                ImageResizer.createResizedImage(uri, 200, 200, "JPEG", 80).then(({uri}) => {
                    this.uploadImage(uri).then(uri => {
                        this.setState({uploading: false});
                        this.props.avatarChanged(uri);
                    });
                }).catch(error => {
                    console.log("Error Uploading" , error);
                })
            }
        });
    }

    onButtonPress() {
        const {email, password, name, avatar} = this.props;

        let username = name ? name : ''
        let userAvatar = avatar ? avatar : ''

        this.props.signupUser({
            email,
            password,
            name: username,
            avatar: userAvatar,
        });
    }

    uploadImage(uri) {
        return new Promise((resolve, reject) => {
            const id = Date.now();

            fetch(uri).then(response => {
                return response.blob();
            }).then(uploadBlob => {
                const imgRef = firebase.storage().ref('avatar').child('avatar_' + id);
                imgRef.put(uploadBlob).then(() => {
                    let url = imgRef.getDownloadURL();
                    resolve(url);
                });
            }).catch(error => {
                reject(error);
            })
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
        console.log("Open Login!");
        this.props.nameChanged('');
        this.props.emailChanged('');
        this.props.passwordChanged('');
        Actions.login();
    }

    render() {
        let bg = require('../../../assets/imgs/login_bg2.jpg');
        let cameraIcon = require('../../../assets/icons/camera.png');
        let logo = require('../../../assets/imgs/profile_bg.png');
        if(this.props.avatar && this.props.avatar != '') {
            logo = {uri: this.props.avatar};
        }

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Image source={bg} style={[styles.fillFixed, {resizeMode: 'stretch'}]} />
                <View style={[styles.fillFixed, {backgroundColor: '#003300CC'}]} />

                <ScrollView style={{width: '100%'}}>
                    <View style={[styles.container, {marginTop: 40}]}>
                        <View style={{paddingBottom: 10}}>
                            <TouchableOpacity onPress={() => this.openLibrary()}>
                                <View style={styles.logo}>
                                {
                                    this.state.uploading ?
                                        <Spinner size="large" /> :
                                        <CachedImage source={logo} style={{width: '100%', height: '100%'}} />
                                }
                                </View>
                                <View style={styles.camIcon}>
                                    <Image source={cameraIcon} style={{width: '100%', height: '100%'}} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={{width: '100%', height: 50}}>
                            {this.renderError()}
                        </View>

                        <Input
                            style={[styles.input, {marginBottom: 20}]}
                            icon={require('../../../assets/icons/profile.png')}
                            placeholder="Jerry Shrive"
                            onChangeText={this.onNameChange.bind(this)}
                            value={this.props.name} />

                        <Input
                            style={[styles.input, {marginBottom: 20}]}
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
                            <Button disabled={this.state.uploading} loading={this.props.loading} onPress={this.onButtonPress.bind(this)}>
                                SIGN UP
                            </Button>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20, width: '80%'}}>
                            <TouchableOpacity onPress={() => this.openLogin()}>
                                <Text style={styles.login}>Already have account?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}


const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    camIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        padding: 5,
        overflow: 'hidden',
        borderRadius: 15,
        backgroundColor: '#AAA'
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
        backgroundColor: '#FFFFFF',
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
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
    },
}

const mapStateToProps = state => {
    return {
        name: state.auth.name,
        email: state.auth.email,
        avatar: state.auth.avatar,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    signupUser,
    avatarChanged,
    nameChanged,
    errorOccurred,
})(Signup);