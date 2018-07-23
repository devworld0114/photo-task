import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import GlobalState from '../../globals/GlobalState';

export default class RenderHeaderView extends React.Component {

    state = {
        selected: 'circle',
    };

    onBack() {
        if(this.props.return) {
            this.props.return();
        }
    }

    onDraw(type) {
        if(this.props.onDrawType) {
            this.props.onDrawType(type);
        }
        this.setState({selected: type});
    }

    onUndo() {
        if(this.props.onUndo) {
            this.props.onUndo();
        }
    }

    render() {
        let { title, renderState } = this.props;
        let { selected } = this.state;

        if(renderState == 'render') {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => this.onBack()}>
                        <Image style={styles.iconImage} source={require('../../assets/icons/back.png')} resizeMode="contain" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>
            );
        } else {
            return (
                <View style={[styles.container, {justifyContent: 'flex-end', opacity: 0.6}]}>
                    <TouchableOpacity style={styles.backIcon} onPress={() => this.onBack()}>
                        <Image style={styles.iconImage} source={require('../../assets/icons/back.png')} resizeMode="contain" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.iconButton, styles.retIcon]} onPress={() => this.onUndo()}>
                        <Image style={styles.iconImage} source={require('../../assets/icons/ret.png')} resizeMode="contain" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.iconButton, selected == 'circle' ? styles.iconSelected : {}]} onPress={() => this.onDraw('circle')}>
                        <Image style={styles.iconImage} source={require('../../assets/icons/circle.png')} resizeMode="contain" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.iconButton, selected == 'arrow' ? styles.iconSelected : {}]} onPress={() => this.onDraw('arrow')}>
                        <Image style={styles.iconImage} source={require('../../assets/icons/arrow.png')} resizeMode="contain" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.iconButton, selected == 'text' ? styles.iconSelected : {}]} onPress={() => this.onDraw('text')}>
                        <Image style={styles.iconImage} source={require('../../assets/icons/text.png')} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 5,
        flexDirection: 'row',
        height: 60,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
    },

    title: {
        fontSize: 15,
        color: 'white',
    },

    iconImage: {
        margin: 5,
        width: 20,
        height: 20,
    },

    iconButton: {
        padding: 5,
        height: 40,
        width: 40,
    },

    iconSelected: {
        backgroundColor: '#f74139',
        borderRadius: 25,
    },

    backIcon: {
        position: 'absolute',
        margin: 5,
        padding: 10,
        height: 40,
        width: 40,
        left: 0,
        top: 0,
    },

    retIcon: {
        marginLeft: '25%',
        marginRight: 30,
    },

});
