import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class Waiting extends React.Component {

    render() {
        let { title } = this.props;
        title = title ? title : 'Processing..';

        return (
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <ActivityIndicator color="#00c853" />
                    <Text style={{marginTop: 20}}>{title}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#000000AA',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },

    mainView: {
        borderRadius: 10,
        backgroundColor: '#ffffffee',
        width: '50%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
});
