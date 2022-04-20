import React from 'react';
import {View, Image, Text,TouchableOpacity, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../../themes/style';

const Skip = ({...props}) => (
    <TouchableOpacity style={style.skipBtn} {...props}>
        <MaterialCommunityIcons 
            name="arrow-right"
            size={32}
            color={Colors.color1}
        />
    </TouchableOpacity>
)

const Done = ({...props}) => (
    <TouchableOpacity style={style.doneBtn} {...props}>
        <Text style={{color:'#fff'}}>Login</Text>
    </TouchableOpacity>
)

const Dots = ({selected}) => {
    let background;
    background = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
    return (
        <View style={{
            width: 5,
            height: 5,
            marginHorizontal:3,
            backgroundColor: background
        }}/>
    )
}

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            DotComponent={Dots}
            DoneButtonComponent={Done}
            onDone={() => navigation.navigate('Login')}
            onSkip={() => navigation.navigate('Login')}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image 
                        style={{height:250,width:250}}
                        source={require('../../assets/images/chatbg1.png')} />,
                    title: 'Fast Messaging',
                    subtitle: 'Chat anytime, Anywhere!',
                    titleStyles: {
                        color:'#3E4685',
                        fontWeight: 'bold',
                        borderBottomWidth:3,
                        borderBottomColor:'#313070',
                        marginBottom:20,
                        letterSpacing: 1
                    },
                    subTitleStyles : {
                        color:'#1C1B3F',
                        paddingHorizontal:10
                    }
                },
                {
                    backgroundColor: '#fff',
                    image: <Image 
                        style={{height:250,width:250}}
                        source={require('../../assets/images/c1.png')} />,
                    title: 'Network',
                    subtitle: 'Join the network create profile, upload photos and share your idea with others',
                    titleStyles: {
                        color:'#3E4685',
                        fontWeight: 'bold',
                        borderBottomWidth:3,
                        borderBottomColor:'#313070',
                        marginBottom:20,
                        letterSpacing: 1
                    },
                    subTitleStyles : {
                        color:'#1C1B3F',
                        paddingHorizontal:10
                    }
                },
                {
                    backgroundColor: '#fff',
                    image: 
                        <Image 
                        style={{height:250,width:250}}
                        source={require('../../assets/images/chatbg5.png')} />,
                    title: 'Group Chat',
                    subtitle: 'Put all your people in the same conversation to share knowledge sharing',
                    titleStyles: {
                        color:'#3E4685',
                        fontWeight: 'bold',
                        borderBottomWidth:3,
                        borderBottomColor:'#313070',
                        marginBottom:20,
                        letterSpacing: 1
                    },
                    subTitleStyles : {
                        color:'#1C1B3F',
                        paddingHorizontal:10
                    }
                },
            ]} 
        />        
    )
}

export default OnboardingScreen;

const style = StyleSheet.create({
    skipBtn: {
        padding:10,
        paddingHorizontal:15,
        borderRadius:2
    },
    doneBtn: {
        backgroundColor:'#3E4685',
        padding:8,
        paddingHorizontal:15,
        borderRadius:2,
        marginRight:10
    }
})


