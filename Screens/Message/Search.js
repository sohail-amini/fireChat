import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../../navigation/AuthProvider';

const Search = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  console.log(user.uid);
  const fetchUsers = search => {
    firestore()
      .collection('users')
      .where('fname', '>=', search)
      .get()
      .then(snapshot => {
        let users = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        setUsers(users);
      });
  };

  return (
    <View style={style.container}>
      <TextInput
        style={style.inputControl}
        placeholder="Type Here..."
        onChangeText={search => fetchUsers(search)}
      />

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({item}) => (
          <TouchableOpacity
            style={style.box}
            onPress={() => navigation.navigate('SearchProfile', {item})}>
            <Image source={{uri: item.userImg}} style={style.img} />
            <Text style={style.text}>
              {item.fname} {item.lname}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Search;

const style = StyleSheet.create({
  container: {},
  title: {
    margin: 10,
    fontSize: 22,
  },
  inputControl: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
  },
  box: {
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  text: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
