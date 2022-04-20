import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Seperator() {
  return <View style={styles.Seperator} />
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#555',
    height: 0.5,
    flex: 1
  }
})