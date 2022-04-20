import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUsersData} from '../../redux/actions/index';
import {AuthContext} from '../navigation/AuthProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Comment = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [thePostId, setThePostId] = useState('');
  const [text, setText] = useState('');
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  const {userId, postId} = route.params;
  const [deleted, setDeleted] = useState(false);

  const fetchComments = async () => {
    const comments = [];

    try {
      firestore()
        .collection('comments')
        .doc(postId)
        .collection('data')
        .get()
        .then(snapshot => {
          snapshot.docs.map(doc => {
            const {text, userName, myId} = doc.data();

            comments.push({
              commentId: doc.id,
              text,
              userName,
              myId,
            });

            setComments(comments);
          });
        });
    } catch (e) {}
  };

  useEffect(() => {
    fetchComments();
    setUpdated(false);
    setDeleted(false);
    navigation.addListener('focus', () => {
      setLoading(!loading);
    });
  }, [navigation, loading, updated, deleted]);

  const handleCommentDelete = commentId => {
    Alert.alert(
      'Delete Comment',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deleteComment(commentId),
        },
      ],
      {cancelable: false},
    );
  };

  const deleteComment = async commentId => {
    firestore()
      .collection('comments')
      .doc(postId)
      .collection('data')
      .doc(commentId)
      .delete()
      .then(() => {
        Alert.alert(
          'Comment deleted!',
          'Your comment has been deleted successfully!',
        );
        setDeleted(true);
        setComments([]);
      })
      .catch(e => alert('Error deleting Comment.', e));
  };

  const onCommentSend = async t => {
    try {
      await firestore()
        .collection('comments')
        .doc(postId)
        .collection('data')
        .add({
          userName: auth().currentUser.email,
          text,
          myId: auth().currentUser.uid,
        });

      setText('');
      setUpdated(true);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <View>
      <View style={styles.commentContainer}>
        <TextInput
          value={text}
          placeholder="Write your comment..."
          onChangeText={text => setText(text)}
          style={styles.inputControl}
        />
        <TouchableOpacity onPress={() => onCommentSend()}>
          <MaterialCommunityIcons name="send" color="crimson" size={25} />
        </TouchableOpacity>
      </View>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={comments}
        style={{width: '100%', marginTop: 10}}
        renderItem={({item}) => (
          <View style={styles.commentList}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <Text style={styles.creator}>{item.userName}</Text>
              <Text> {item.text} </Text>
            </View>
            {item.myId === user.uid ? (
              <TouchableOpacity
                style={{}}
                onPress={() => handleCommentDelete(item.commentId)}>
                <MaterialCommunityIcons name="delete" color="gray" size={17} />
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      />
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  commentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  inputControl: {
    flex: 1,
  },
  commentList: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: '#aaa',
    flexDirection: 'row',
  },
  creator: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
