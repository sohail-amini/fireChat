import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import useStatsBar from '../../Utils/useStatusBar';

export default function AddRoomScreen({ navigation }) {
  useStatsBar('dark-content');

  const [roomName, setRoomName] = useState('');

  function handleButtonPress() {
    if (roomName.length > 0) {
      firestore()
        .collection('THREADS')
        .add({
          name: roomName,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime()
          }
        })
        .then(docRef => {
          docRef.collection('MESSAGES').add({
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true
          });
          navigation.navigate('Groups');
        });
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={36}
          color='#6646ee'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <FormInput
          iconType="account-group"
          value={roomName}
          plcText="Room Name"
          onChangeText={text => setRoomName(text)}
          clearButtonMode='while-editing'
        />
        <FormButton
          btnTitle='Create room'
          modeValue='contained'
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  buttonLabel: {
    fontSize: 22
  }
});