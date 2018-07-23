import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const ScarletScreen = () => {

    return (
        <View style={styles.container}>
            <Text onPress={() => Actions.modal()}>Open Modal</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bb77aa'
    }
});

export default ScarletScreen;