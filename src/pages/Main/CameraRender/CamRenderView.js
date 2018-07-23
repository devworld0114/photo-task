import React from 'react';
import { StyleSheet, View, Image, Alert, CameraRoll } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RenderHeaderView from './RenderHeaderView';
import RenderBottomView from './RenderBottomView';
import GlobalState from '../../globals/GlobalState';
import Waiting from '../../customize/Waiting';
import ViewShot from 'react-native-view-shot';
import DrawRenderView from './DrawRenderView';


export default class CamRenderView extends React.Component {

    state = {
        view: 'render',
        imgUri: '',
        processing: false,
        shape: 'circle',
        color: 'red',
    };

    componentDidMount() {
        this.width = 0;
        this.height = 0;
    }

    takePicture() {
        if(this.camera) {
            this.setState({processing: true});

            console.log("TAKING PICTURE...");
            const options = {
                quality: 0.9, 
                base64: false,
                width: 1024,
                fixOrientation: true,
                forceUpOrientation: true,
            };
            this.camera.takePictureAsync(options).then(data => {
                this.setState({
                    processing: false,
                    imgUri: data.uri,
                    view: 'confirm',
                });
                console.log("TAKEN PICTURE...");
            }).catch(err => {
                console.log("Take Picture Error", err);
                this.setState({processing: false});
            });
        }
    }

    saveToPicture(uri) {
        this.setState({processing: true});
        CameraRoll.saveToCameraRoll(uri).then(() => {
            console.log("SAVED TO ROLL");
            this.setState({processing: false});
            Alert.alert('Success', 'Photo added to camera roll!')
        }).catch(err => {
            console.log("FAILED TO SAVE ON ROLL");
            this.setState({processing: false});
            console.log('err:', err);
        });
    }

    returnConfirm() {
        this.setState({view: 'render'});
    }

    onUndoDraw() {
        GlobalState.setState('undo', 1);
    }

    onChangeType(type) {
        console.log("CHANGING TYPE", type);
        this.setState({shape: type});
    }

    confirmPicture() {
        this.setState({processing: true});
        this.viewShot.capture().then(uri => {
            console.log("URI SAVED", uri);
            this.saveToPicture(uri);
            this.setState({
                processing: false,
                imgUri: uri
            });
        });
    }

    onConfirmSaved(result, uri) {
        this.setState({processing: false});
        if(result) {
            GlobalState.setAppState('markupUri', uri);
        }
    }

    render() {
        let { view, imgUri, color, shape } = this.state;

        return (
            <View style={styles.container}>
                { this.state.processing && <Waiting /> }
                {
                    view == 'render' ?
                        <RNCamera
                            orient
                            ref={camera => this.camera = camera}
                            style={styles.preview}
                            type={RNCamera.Constants.Type.back}
                            permissionDialogTitle={'Permission to user camera'}
                            permissionDialogMessage={'We need your permission to use your camera phone'} /> :
                    view == 'confirm' ?
                        <View style={styles.preview}>
                            <ViewShot style={{width: '100%', height: '100%'}} ref={shot => this.viewShot = shot} options={{format: 'jpg', quality: 0.9}}>
                                <Image style={styles.preview} source={{uri: imgUri}} resizeMode="contain" />
                                <DrawRenderView type={shape} color={color} />
                            </ViewShot>
                        </View> :
                        <View style={[styles.preview, {backgroundColor: '#aaa'}]}></View>
                }
                <RenderHeaderView 
                    title="Create Task" 
                    renderState={view} 
                    return={() => this.returnConfirm()}
                    onUndo={() => this.onUndoDraw()} 
                    onDrawType={type => this.onChangeType(type)} />
                <RenderBottomView 
                    renderState={view} 
                    takePicture={() => this.takePicture()} 
                    return={() => this.returnConfirm()}
                    confirmPicture={() => this.confirmPicture()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },

    preview: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },

    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
    
});
