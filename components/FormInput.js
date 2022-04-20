import React from 'react';
import {View,Text, TouchableOpacity,StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {windowHeight} from '../Utils/Dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FormInput = ({ 
    labelValue, 
    plcText, 
    iconType,
    iconColor, 
    ...rest}) => {
    return (
        <View style={st.inputContainer}>
            <View style={st.iconContainer}>
                <MaterialCommunityIcons 
                    name={iconType}
                    size={32}
                    color={iconColor}
                />
            </View>
            <TextInput
                style={st.input}
                value={labelValue}
                numberOfLines={1}
                placeholder={plcText}
                placeholderTextColor="#aaa"
                {...rest} 
            />
        </View>
    )
}
export default FormInput;

const st = StyleSheet.create({
    inputContainer: {
        justifyContent:"center",
        height: windowHeight/12,
        width: '95%',
        marginTop:15,
        backgroundColor:'white',
        flexDirection:'row',
        borderWidth:.4,
        borderColor:'#C0C0C0',
        borderRadius:5
    },
    iconContainer: {
        height:'100%',
        borderRightWidth:1,
        borderColor:'#eee',
        alignItems:'center',
        justifyContent:'center',
        flex:1.4
    },
    input: {
        padding:11,
        fontSize:18,
        flex:6
    }
})