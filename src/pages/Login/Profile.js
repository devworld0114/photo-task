import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { avatarChanged, nameChanged, updateProfile } from '../../actions';
import { Input, Button, Spinner } from '../../components';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-cached-image';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import firebase from 'firebase';

class Profile extends Component {

    state = {
        uploading: false
    };

    onNameChanged(text) {
        this.props.nameChanged(text);
    }

    onButtonPress() {
        const {avatar, name} = this.props;
        if(this.props.loading) {
            return;
        }

        this.props.updateProfile({
            name,
            avatar
        });
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
                        console.log("IMAGE URI", uri)
                        this.setState({uploading: false});
                        this.props.avatarChanged(uri);
                    });
                }).catch(error => {
                    console.log("Error Uploading" , error);
                })
            }
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

    render() {
        let bg = require('../../../assets/imgs/login_bg2.jpg');
        let logo = require('../../../assets/imgs/profile_bg.png');
        if(this.props.user && this.props.user.photoURL) {
            logo = {uri: this.props.user.photoURL};
        }

        if(this.props.avatar) {
            logo = {uri: this.props.avatar};
        }

        console.log("LOGO", logo);

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Image source={bg} style={[styles.fillFixed, {resizeMode: 'stretch'}]} />
                <View style={[styles.fillFixed, {backgroundColor: '#003300CC'}]} />

                <ScrollView style={{width: '100%'}}>
                    <View style={[styles.container, {marginTop: 20}]}>
                        <View style={{paddingBottom: 10}}>
                            <TouchableOpacity onPress={() => this.openLibrary()}>
                                <View style={styles.logo}>
                                    {
                                        this.state.uploading ?
                                            <Spinner size="large" /> :
                                            <CachedImage source={logo} style={{width: '100%', height: '100%'}} />
                                    }
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.logoTitle}>My Profile</Text>
                        </View>

                        <View style={{width: '100%', height: 30}}>
                            {this.renderError()}
                        </View>

                        <Input disabled
                            style={[styles.input, {marginBottom: 20}]}
                            icon={require('../../../assets/icons/email.png')}
                            placeholder="email@gmail.com"
                            value={this.props.user.email} />

                        <Input
                            style={[styles.input, {marginBottom: 20}]}
                            icon={require('../../../assets/icons/profile.png')}
                            placeholder="Jerry Shrive"
                            onChangeText={(text) => this.onNameChanged(text)}
                            value={this.props.user.displayName} />

                        <View style={{width: '80%', alignSelf: 'center', justifyContent: 'center'}}>
                            <Button loading={this.props.loading} onPress={() => this.onButtonPress()}>
                                UPDATE PROFILE
                            </Button>
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
        textAlign: 'center',
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
        email: state.auth.user,
        avatar: state.auth.avatar,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, {
    avatarChanged,
    nameChanged,
    updateProfile,
})(Profile);