import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {AuthContext} from '../../navigation/AuthProvider';
import PostCard from '../../components/PostCard';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Comment from '../../components/Comment';
import {Container} from '../../styles/FeedStyles';
import {FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../themes/style';

const HomeScreen = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [liked, setLiked] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {userId, post, postId, postImg, postTime, likes, liked} =
              doc.data();
            list.push({
              userId,
              postId: doc.id,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              liked,
              likes,
            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading, deleted]);

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch(e => alert('Error deleting posst.', e));
  };

  function handleLike(postId) {
    // Create a reference to the post
    const postReference = firestore().doc(`posts/${postId}`);

    return firestore().runTransaction(async transaction => {
      // Get post data first

      const postSnapshot = await transaction.get(postReference);

      if (postSnapshot.data().liked) {
        transaction.update(postReference, {
          likes: postSnapshot.data().likes - 1,
          liked: false,
        });
      } else {
        transaction.update(postReference, {
          likes: postSnapshot.data().likes + 1,
          liked: true,
        });
      }

      fetchPosts();
    });
  }

  const handleCommentClick = (userId, postId) => {
    navigation.navigate('comment', {userId, postId});
  };

  const ListHeader = () => {
    return null;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {false ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
                />
              </View>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View style={{width: 300, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
              />
              <View
                style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
                />
              </View>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View style={{width: 300, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
              />
              <View
                style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <Container>
          <FlatList
            style={{width: '100%', padding: 20}}
            data={posts}
            renderItem={({item}) => (
              <PostCard
                item={item}
                onDelete={handleDelete}
                commentClick={handleCommentClick}
                onLike={handleLike}
                onPress={() =>
                  navigation.navigate('HomeProfile', {userId: item.userId})
                }
              />
            )}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
          />
        </Container>
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        color="#fff"
        onPress={() => navigation.navigate('AddPost')}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.color4,
  },
});
