import React from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { Actions } from 'react-native-router-flux';

const MyLists = () => {
    return (

        <View style={styles.container}>
            <SectionList

        renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}

        renderSectionHeader={({section: {title}}) => (
            <Text style={{
                fontWeight: 'bold'
            }}>{title}</Text>
        )}

        sections={[
            {
                title: 'Title1',
                data: ['item1', 'item2']
            },
            {
                title: 'Title2',
                data: ['item3', 'item4']
            },
            {
                title: 'Title3',
                data: ['item5', 'item6']
            },
        ]}
        keyExtractor={(item, index) => item + index}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray'
    }
});

export default MyLists;