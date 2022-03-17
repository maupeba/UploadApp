import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button({name, onPress, testID}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} testID={testID}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 50,
    borderRadius: 4,
    borderColor: '#aaa',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  text: {
    color: '#7159c1',
    fontWeight: 'bold',
    fontSize: 18
  }
})
