import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../Screens/Home/HomeScreen';
import ProfileScreen from '../Screens/Profile/UserProfile';
import AddPostScreen from '../Screens/Home/AddPostScreen';
import EditProfileScreen from '../Screens/Profile/EditProfileScreen';
import ShowUsers from '../Screens/Message/showUsers';
import GroupsScreen from '../Screens/Groups/GroupsScreen';
import RoomScreen from '../Screens/Groups/RoomScreen';
import AddRoomScreen from '../Screens/Groups/AddRoomScreen';
import Search from '../Screens/Message/Search';
import SearchProfile from '../Screens/Message/SearchProfile';
import chatScreen from '../Screens/Message/chatScreen';
import Comment from '../components/Comment';
import EditRoom from '../Screens/Groups/EditRoom';
const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

import Colors from '../themes/style';

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerTitle: 'AfghanGram',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          color: '#2e64e5',
          fontFamily: 'Kufam-SemiBoldItalic',
          fontSize: 20,
          fontStyle: 'italic',
          fontWeight: 'bold',
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />

    <Stack.Screen
      options={{
        headerTitle: 'Comments',
      }}
      name="comment"
      component={Comment}
    />

    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const MessageStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: 'Contacts',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              style={{marginRight: 20}}>
              <Ionicons name="search" size={22} />
            </TouchableOpacity>
          ),
        }}
        name="showUsers"
        component={ShowUsers}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          tabBarVisible: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />

      <Stack.Screen name="chatScreen" component={chatScreen} />

      <Stack.Screen
        name="SearchProfile"
        component={SearchProfile}
        options={{
          headerTitle: 'Result Found',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#fff',
            shadowColor: '#fff',
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const ChatGroupStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Groups"
      component={GroupsScreen}
      options={({navigation}) => ({
        headerRight: () => (
          <Ionicons
            style={{marginRight: 10}}
            name="create"
            color={Colors.color1}
            size={30}
            onPress={() => navigation.navigate('addRoomScreen')}
          />
        ),
      })}
    />
    <Stack.Screen name="roomScreen" component={RoomScreen} options={{}} />
    <Stack.Screen name="editRoom" component={EditRoom} options={{}} />
    <Stack.Screen
      name="addRoomScreen"
      component={AddRoomScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        style: {
          paddingBottom: 3,
        },
      }}
      activeColor="#fff"
      inactiveColor={Colors.color2}
      barStyle={{backgroundColor: Colors.color1}}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={23}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbox-ellipses-outline" color={color} size={23} />
          ),
        })}
      />
      <Tab.Screen
        name="groupStack"
        component={ChatGroupStack}
        options={{
          title: 'Groups',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="people" color={color} size={23} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
