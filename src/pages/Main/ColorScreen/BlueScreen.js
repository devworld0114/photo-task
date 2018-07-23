import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { firestore } from 'firebase/firestore';


const BlueScreen = () => {

    const sayHello = () => {

        console.log(firebase.auth().currentUser);

        // db = firebase.firestore();

    // db.collection("MyCollection").add({
    //     first: "Pluto",
    //     last: "Doggy"
    // }).then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // }).catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
    }



    return (
        <View style={styles.container}>
            <Text onPress={() => sayHello()}
        >Say something!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    }
});

export default BlueScreen;