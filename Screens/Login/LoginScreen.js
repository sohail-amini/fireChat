import React, {useContext, useState,useEffect} from 'react';
import {TouchableOpacity,LogBox, Image, View, Text, StyleSheet,Dimensions} from 'react-native';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import SocialButton from '../../components/SocialButton'
import {AuthContext} from '../../navigation/AuthProvider';
import Colors from '../../themes/style';
import WavyHeader from '../../components/WavyHeader';


LogBox.ignoreLogs(['Reanimated 2']);

import {useValidation} from 'react-native-form-validator';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, fbLogin} = useContext(AuthContext);
    
    const checkField = () => {
        if (email.length === 0) {
            alert('Please enter an email!')
        }
        else if (password.length === 0) {
            alert("Please enter a password!")
        } 
        else {
            login(email, password)
        }
    }


    return (
        <View style={st.container}>
            
            <View style={st.topContainer}>
                <WavyHeader 
                    customHeight={100}
                    customTop={100}
                    customBgColor={Colors.color1}
                    customStyles={st.svgCurve} />
                <View style={st.headerContainer}>
                    <Text style={st.headerText}>AfghanGram</Text>
                </View>
            </View>

        <View style={st.formContainer}>
            <Text style={{
                fontSize:25,
                fontWeight:'bold',
                marginLeft:15,
                color:Colors.color1, 
                alignSelf:'flex-start'}}>Login</Text>

            <FormInput
                
                labelValue={email}
                onChangeText={value => setEmail(value)}
                iconType="email" 
                iconColor="#737D9C"
                plcText="Type your email"/>
                
            <FormInput
                labelValue={password}
                onChangeText={value => setPassword(value)}
                iconType="lock"
                secureTextEntry={true}
                iconColor="#737D9C"
                plcText="Type your password"/>

            <FormButton 
                onPress={checkField} 
                btnTitle="Login" />

            <TouchableOpacity style={{width:'90%'}}>
                <Text style={st.frgPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>

            <SocialButton 
                onPress={() => fbLogin()}
                btnIcon="facebook"
                btnTitle="Login with Facebook"
                color="#4867aa"
                background="#e6eaf4"
            />

            <TouchableOpacity
                style={[st.createBtn]}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={st.crText}>Create account</Text>
            </TouchableOpacity>
        </View>
        
        </View>
    )
}

export default LoginScreen;

const st = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        backgroundColor: Colors.color5,
        alignItems:'center'
    },
    topContainer: {
        flex:.8,
        width:'100%',
    },
    headerContainer: {
        marginTop:20
    },
    svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        // change the color property for better output
        color: '#fff',
        textAlign: 'center',
        marginTop: 35
    },

    formContainer: {
       flex:2,
       position:'absolute',
       top:180,
       width:'100%',
       alignItems:'center',
       paddingHorizontal:10
    },
    img: {
        height:150,
        width:150
    },
    title: {
        fontSize:30,
        color: '#242936'
    },
    crText: {
        fontSize:24,
        color:'#0E3471'
    },
    frgPasswordText: {
        fontSize:16,
        color:'#687294',
        alignSelf:'flex-start',
        marginLeft:5,
        marginTop:-5
    },
    createBtn: {
        marginTop:20,
        padding:8,
        width:'100%',
        alignItems:'center',
        borderRadius:5,
        alignSelf:'center'
        // elevation: 4,
        // shadowColor: Colors.color1,
    }
    
})

