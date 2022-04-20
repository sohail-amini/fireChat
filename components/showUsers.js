import React from "react";
import { Text, StyleSheet ,TouchableOpacity } from "react-native";
const ShowUsers = ({ name, img, onImgTap, onNameTap }) => {
  return (
      <View>
          <Text>{name}</Text>
      </View>
  );
};
export default ShowUsers;