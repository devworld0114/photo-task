import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const ModalScreen = () => {
    return (
        <View style={styles.container}>
            <Text onPress={() => Actions.pop()}>back</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange'
    }
});

export default ModalScreen;