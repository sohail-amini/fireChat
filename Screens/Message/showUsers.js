import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {List, Divider} from 'react-native-paper';
import {ListItem, Avatar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../components/Loading';
import useStatsBar from '../../Utils/useStatusBar';
import {AuthContext} from '../../navigation/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function HomeScreen({navigation, route}) {
  useStatsBar('light-content');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const {user} = useContext(AuthContext);
  const [docId, setDocId] = useState();

  const getUsers = async () => {
    const querySanp = await firestore()
      .collection('contacts')
      .doc(user.uid)
      .collection('list')
      .get();

    const allusers = querySanp.docs.map(docSnap => docSnap.data());

    setUsers(allusers);
  };

  const deleteContact = userId => {
    firestore()
      .collection('contacts')
      .doc(user.uid)
      .collection('list')
      .doc(userId)
      .delete();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.uid}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => (
          <View onPress={() => navigation.navigate('chatScreen', {item})}>
            <ListItem.Swipeable
              rightContent={
                <TouchableOpacity
                  onPress={() => deleteContact(item.id)}
                  title="Delete"
                  style={styles.deleteBtn}
                  icon={{name: 'delete', color: 'white'}}>
                  <Text style={{fontSize: 22, color: '#fff'}}>Delete</Text>
                </TouchableOpacity>
              }>
              <Avatar rounded source={{uri: item.userImg}} />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem.Swipeable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
  listItem: {
    margin: 5,
    marginHorizontal: 15,
  },
  deleteBtn: {
    backgroundColor: 'red',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});
