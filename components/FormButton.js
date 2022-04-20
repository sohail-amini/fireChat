import React from 'react';
import {Text, TouchableOpacity,StyleSheet} from 'react-native';
import {windowHeight} from '../Utils/Dimensions';
import Colors from '../themes/style';

const FormButton = ({btnTitle, ...rest}) => {
    return (
        <TouchableOpacity style={st.btn} {...rest}>
            <Text style={[st.btnText,{fontSize:22}]}>{btnTitle}</Text>
        </TouchableOpacity>
    )
}

export default FormButton;
const st = StyleSheet.create({
    btn: {
        marginTop: 12,
        marginBottom: 10,
        backgroundColor: Colors.color1,
        padding:10,
        alignItems:'center',
        height: windowHeight / 13,
        borderRadius:4,
        width:'90%'
    },
    btnText: {
        fontSize:19,
        color:'#fff'
    }
})