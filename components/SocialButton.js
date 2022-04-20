import React from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import {windowHeight} from '../Utils/Dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../themes/style';

const SocialButton = ({
    btnTitle,
    btnIcon,
    background,
    color,
    ...rest
    }) => {
    return (
        <TouchableOpacity 
            style={[
                st.btn, 
                {backgroundColor:background}]} {...rest}>       
            <View style={st.icon}>
                <FontAwesome 
                    name={btnIcon} 
                    size={22} 
                    color={color} 
                />
            </View>
            <View style={st.btnText}>
                <Text style={[st.btnText, {color:color}]}>
                    {btnTitle}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
export default SocialButton;

const st = StyleSheet.create({
    btn: {
        marginTop:25,
        padding:13,
        alignItems:'center',
        width: '90%',
        height: windowHeight / 12,
        borderRadius:2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        flex:2,
        alignItems:'center'
    },
    btnText: {
        fontSize:18,
        flex:5
    }
})