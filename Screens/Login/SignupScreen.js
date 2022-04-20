import React, {useContext, useState} from 'react';
import {
  View,
  Text, 
  TouchableOpacity, 
  Platform, 
  StyleSheet, 
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, } from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import SocialButton from '../../components/SocialButton';
import {AuthContext} from '../../navigation/AuthProvider';
import Colors from '../../themes/style';
import Loading from '../../components/Loading';


const SignupScreen = ({navigation}) => {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const {register,fbLogin} = useContext(AuthContext);

  const checkField = () => {
        if (fname.length === 0) {
          alert('Type your name please 🙂')
        }
        else if (lname.length === 0) {
          alert('Type your last name please 🙂')
        }
        else if (email.length === 0) {
          alert("Type your last email please 🙂")
        } 
        else if (password.length === 0) {
          alert("Type your last password please 🙂")
        } 
        else {
          register(fname, lname, email, password)
        }
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset="-50"
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{flex:1}}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={fname.toString()}
        onChangeText={(fname) => setFname(fname)}
        plcText="First name"
        iconType="account-circle"
        keyboardType="text"
        autoCapitalize="none"
        autoCorrect={false}
      />

       <FormInput
        labelValue={lname.toString()}
        onChangeText={(lname) => setLname(lname)}
        plcText="Last name"
        iconType="account-circle"
        keyboardType="text"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <FormInput
        labelValue={email.toString()}
        onChangeText={(email) => setEmail(email)}
        plcText="Your email address"
        iconType="email"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        plcText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        btnTitle="Sign Up"
        btnBgColor="red"
        onPress={checkField}
      />

        <View>
          <SocialButton
            btnTitle="Continue with Facebook"
            btnIcon="facebook"
            color="#fff"
            background={Colors.color1}
            onPress={() => fbLogin()}
          />
        </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Login</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:10
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 0,
    color: Colors.color1,
    fontWeight:'bold',
    letterSpacing:.5
  },
  navButton: {
    marginTop: 10
  },
  navButtonText: {
    fontSize: 18,
    marginTop:10,
    fontWeight: '500',
    color: '#0E3471',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});