import React, { useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import useStatsBar from '../../Utils/useStatusBar';

export default function EditRoom({ navigation }) {
  useStatsBar('dark-content');

  const [roomName, setRoomName] = useState('');

  return (
    <View>
        <Text>Edit group</Text>     
    </View>
  );
}

const styles = StyleSheet.create({
  
});