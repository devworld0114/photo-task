import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class RenderBottomView extends React.Component {

    onTakePicture() {
        if(this.props.takePicture) {
            this.props.takePicture();
        }
    }

    onConfirmPicture() {
        if(this.props.confirmPicture) {
            this.props.confirmPicture();
        }
    }

    onReturn() {
        if(this.props.return) {
            this.props.return();
        }
    }

    render() {
        let { renderState } = this.props;

        if(renderState == 'render') {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>PHOTO</Text>
                    <TouchableOpacity onPress={() => this.onTakePicture()}>
                        <Image style={styles.iconButton} source={require('../../assets/icons/take.png')} />
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={[styles.container, {flexDirection: 'row'}]}>
                    <TouchableOpacity onPress={() => this.onReturn()}>
                        <Image style={styles.iconButton} source={require('../../assets/icons/return.png')} />
                    </TouchableOpacity>
                    <View style={{flex: 1}} />
                    <TouchableOpacity onPress={() => this.onConfirmPicture()}>
                        <Image style={styles.iconButton} source={require('../../assets/icons/check.png')} />
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        height: 100,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#00000088',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconButton: {
        marginLeft: 30,
        marginRight: 30,
        height: 40,
        width: 40,
    },

    text: {
        color: '#aaa',
        fontSize: 12,
    }
    
});
