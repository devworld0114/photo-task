import React from 'react';
import { StyleSheet, View, PanResponder, Dimensions } from 'react-native';
import Svg,{
    Ellipse,
    G,
    Line,
    Polygon,
    Rect,
    Text,
} from 'react-native-svg';
import Prompt from '../../customize/Prompt';
import GlobalState from '../../globals/GlobalState';

export default class DrawRenderView extends React.Component {

    state = {
        text: '',
    }

    constructor() {
        super();

        this.responder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: () => this.onStartDraw('Grant'),
            onPanResponderMove: (evt, gestureState) => this.onMovePanGesture(evt, gestureState),
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: () => this.onEndDraw('Release'),
            onPanResponderTerminate: () => true,
            onShouldBlockNativeResponder: () => true,
        });

        this.screenWidth = Dimensions.get('window').width;
        this.screenHeight = Dimensions.get('window').height;
        this.shapes = [];
        this.shape = {};
        this.textState = false;
    }

    componentDidMount() {
        this.width = 0;
        this.height = 0;

        GlobalState.setChangeListener((key) => {
            console.log("KEY", key, this.shapes.length);
            if(key == 'undo' && this.shapes.length > 0) {
                this.shapes.splice(this.shapes.length - 1, 1);
                this.forceUpdate();
            }
        });
    }

    onStartDraw() {
        console.log("STARTING", this.props.type);
        this.shape = {
            type: this.props.type,
            color: this.props.color,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        return true;
    }

    onMovePanGesture(_, gestureState) {
        this.shape.x = gestureState.x0;
        this.shape.y = gestureState.y0;
        this.shape.width = gestureState.dx;
        this.shape.height = gestureState.dy;
        this.forceUpdate();
        return true;
    }

    onEndDraw() {
        console.log("ENDING", this.props.type);
        if(this.shape.type != 'text') {
            this.shapes.push(this.shape);
            this.shape = null;
        } else {
            this.textState = true;
        }
        this.forceUpdate();
        return true;
    }

    drawShape(shape, index, moving) {
        if(!shape) {
            return null
        }

        index = index ? index : 0;

        if(shape.type == 'circle') {
            let cx = shape.x + shape.width / 2;
            let cy = shape.y + shape.height / 2;
            return <Ellipse key={index} cx={cx} cy={cy} rx={shape.width / 2} ry={shape.height / 2} stroke={shape.color} strokeWidth={2} fill={'transparent'} />
        } else if(shape.type == 'arrow') {
            let cx = shape.x;
            let cy = shape.y;
            let width = shape.width;
            let height = shape.height;
            let len = Math.sqrt(width * width + height * height);
            let angle = Math.atan(height / width) / Math.PI * 180;
            if(width < 0) {
                angle += 180;
            }

            return <G key={index} rotation={angle} origin={"0, 0"} x={cx} y={cy}>
                    <Line x1={0} y1="0" x2={len} y2="0" stroke={shape.color} strokeWidth="5" />
                    <Polygon points={(len) + ",-10 " + len + ",10 " + (len + 30) + ",0"} fill={shape.color} />
                </G>
        } else {
            let ptX = shape.x + shape.width - 30;
            let ptY = shape.y + shape.height - 20;
            let text = shape.text ? shape.text : '';
            if(moving) {
                return <Rect key={index} x={ptX - 5} y={ptY - 17} width={60} height={20} fill={'transparent'} stroke={shape.color} strokeWidth={1} />
            } else {
                return <Text style={{borderColor: 'red', borderWidth: 1}} key={index} x={ptX} y={ptY} textAnchor="start" fontSize="16" fill={shape.color}>{text}</Text>
            }
        }
    }

    onCancelText() {
        this.textState = false;
        this.shape = null;
        this.forceUpdate();
    }

    doneInputText(value) {
        this.textState = false;
        this.shape['text'] = value;
        this.shapes.push(this.shape);
        this.shape = null;
        this.setState({text: value});
        this.forceUpdate();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container} {...this.responder.panHandlers}>
                    <Svg width={this.screenWidth} height={this.screenHeight}>
                    {
                        this.shapes.map((shape, index) => {
                            return this.drawShape(shape, index);
                        })
                    }
                    {
                        this.drawShape(this.shape, 0, !this.textState)
                    }
                    </Svg>
                </View>

                <Prompt
                    title="Input Text"
                    placeholder="Input value here"
                    defaultValue={this.state.text}
                    visible={this.textState}
                    onCancel={() => this.onCancelText()}
                    onSubmit={(value) => this.doneInputText(value)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        left: 0,
        height: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },

    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#000000AA', 
        flexDirection: 'row',
    },

    input : {
        fontSize: 16,
        backgroundColor: 'white',
        marginLeft: 30,
        flex: 1,
    },
    
    iconButton: {
        marginLeft: 30,
        marginRight: 30,
        height: 40,
        width: 40,
    },

});
