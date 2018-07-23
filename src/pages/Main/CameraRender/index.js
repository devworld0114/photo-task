import React from 'react';
import { StyleSheet, View } from 'react-native';
import CamRenderView from './pages/CameraRender/CamRenderView';

export default class CameraRender extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <CamRenderView />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
