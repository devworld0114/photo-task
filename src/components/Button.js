import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Spinner } from './Spinner';

const Button = ({ onPress, children, style, loading, disabled }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[buttonStyle, style]}>
        {
            loading ?
                <Spinner size="large" color="white" /> :
                <Text style={textStyle}>{children}</Text>
        }            
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },

    buttonStyle: {
        borderRadius: 24,
        borderColor: 'white',
        borderWidth: 1,
        height: 48,
    },

    small: {
        width: 48,
    }
};

export { Button };
