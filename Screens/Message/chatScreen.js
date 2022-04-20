import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import Colors from '../../themes/style';
export default function ChatScreen({navigation, route}) {
  const {user: me} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const {item: friend} = route.params;

  console.log('friend ID', friend.uid);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Image
            style={{
              height: 42,
              width: 42,
              borderRadius: 45,
              marginRight: 270,
            }}
            source={{uri: friend.userImg}}
          />
        </View>
      ),
      title: <Text> {friend.fname} </Text>,
      headerTitleStyle: {
        marginLeft: 25,
      },
    });
  }, [navigation, route]);

  const getAllMessages = async () => {
    const docid =
      friend.uid > me.uid
        ? me.uid + '-' + friend.uid
        : friend.uid + '-' + me.uid;

    const querySanp = await firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allmsg = querySanp.docs.map(docSanp => {
      return {
        ...docSanp.data(),
        createdAt: docSanp.data().createdAt.toDate(),
      };
    });
    setMessages(allmsg);
  };

  useEffect(() => {
    getAllMessages();

    const docid =
      friend.uid > me.uid
        ? me.uid + '-' + friend.uid
        : friend.uid + '-' + me.uid;

    const messageRef = firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data();
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allmsg);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const onSend = messageArray => {
    const msg = messageArray[0];

    const mymsg = {
      ...msg,
      sentBy: me.uid,
      sentTo: friend.uid,
      createdAt: new Date(),
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));

    const docid =
      friend.uid > me.uid
        ? me.uid + '-' + friend.uid
        : friend.uid + '-' + me.uid;

    firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <GiftedChat
        messages={messages}
        onSend={text => onSend(text)}
        user={{
          _id: me.uid,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: Colors.color4,
                },
              }}
            />
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              containerStyle={{
                borderTopWidth: 1.5,
                borderTopColor: Colors.color1,
              }}
              textInputStyle={{color: 'black'}}
            />
          );
        }}
      />
    </View>
  );
}
