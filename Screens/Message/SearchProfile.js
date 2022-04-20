import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../themes/style';
const SearchProfile = ({navigation, route}) => {
  const [userPosts, setUserPosts] = useState([]);
  const [following, setFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const {item} = route.params;
  const {user} = useContext(AuthContext);

  const docId = item.uid + '-' + user.uid;

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const handleAddToContact = () => {
    storeData(docId);

    firestore()
      .collection('contacts')
      .doc(user.uid)
      .collection('list')
      .doc(item.uid)
      .set({
        name: item.fname,
        userImg: item.userImg,
        email: item.email,
        id: item.uid,
        createdAt: new Date().getTime(),
      })
      .then(docRef => {
        navigation.navigate('showUsers');
      });
  };

  return (
    <View style={style.container}>
      <View style={style.containerInfo}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 50, width: 50, borderRadius: 50}}
            source={{uri: item.userImg}}
          />
          <Text style={style.name}>
            {item.fname} {item.lname}
          </Text>
        </View>
        <View style={style.btnContainer}>
          {false ? (
            <View style={{width: '100%'}}>
              <Text style={{fontSize: 25}}>Your profile</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handleAddToContact()}
              style={style.btn}>
              <Text style={{color: '#E6E7E8', fontWeight: 'bold'}}>
                Add contact
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  btnContainer: {
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center',
  },
  btn: {
    padding: 10,
    backgroundColor: Colors.color1,
    borderRadius: 5,
  },
});

export default SearchProfile;
