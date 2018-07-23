import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';


const Settings = () => {

    const logMeOut = () => {
        firebase.auth().signOut().then(function() {
            console.log("Sign-out successful");
            Actions.login();
        }).catch(function(error) {
            console.log("Sign-out ERROR");
            console.log(error);
        });
    }

    const toProfile = () => {
        Actions.profile()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.menuItem}>My Settings</Text>
            <Text style={styles.menuItem} onPress={() => toProfile()}>My Profile</Text>
            <Text style={styles.menuItem} onPress={() => logMeOut()}>Logout</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    menuItem: {
        margin: 10,
        fontSize: 16,
    }
});

export default Settings;