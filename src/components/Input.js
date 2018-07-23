import React from 'react';
import { TextInput, View, Image } from 'react-native';

const Input = ({value, icon, onChangeText, placeholder, secureTextEntry, style, disabled}) => {
    const {inputStyle, containerStyle} = styles;

    return (
        <View style={[containerStyle, style, disabled ? styles.disable : {}]}>
            <Image source={icon} style={styles.icon} resizeMode="stretch" />
            <TextInput editable={!disabled}
                underlineColorAndroid='transparent'
                placeholderTextColor="#DDD"
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={[inputStyle, disabled ? styles.disableText : {}]}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize='none' />
        </View>
    );
};

const styles = {
    
    containerStyle: {
        backgroundColor: '#FFFFFF88',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },

    disable: {
        backgroundColor: '#FFFFFF33',
    },

    disableText: {
        color: '#FFFFFF88'
    },

    icon: {
        width: 26,
        height: 26,
        marginRight: 10,
    },

    inputStyle: {
        color: 'white',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        flex: 1,
    },
};

export { Input };
