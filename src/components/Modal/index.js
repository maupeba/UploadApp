import React from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';

export default function ({showAlert, message, setShowAlert, setMessage, setResponseStatus}) {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={showAlert}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowAlert(!showAlert)
                setMessage('');
                setResponseStatus(0);
              }}
            >
              <Text style={styles.textStyle}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    padding: 50
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#fff',
  },
  textStyle: {
    color: '#7159c1',
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: '#7159c1',
  }
})
