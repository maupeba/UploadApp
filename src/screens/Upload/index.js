import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ProgressBar, Colors } from 'react-native-paper';

import Button from '../../components/Button';
import Modal from '../../components/Modal';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState(0);

  useEffect(() => {
    if(!responseStatus) return;

    if(responseStatus === 200) {
      setMessage('File uploaded')
    } else {
      setMessage('File not uploaded')
    }

    setShowAlert(true);

  }, [responseStatus])

  function imagePickerCallback(data) {
    if(data.didCancel || data.error) return;

    const file = data.assets[0]

    if(!file.uri) return;

    setFile(file);
    setUploading(true);
    setProgress(0);
  }

  function handleSelectFile() {
    launchImageLibrary({}, imagePickerCallback);
  }

  function handleProgress(event) {
    setProgress(Math.round((event.loaded * 100) / event.total))
  }

  async function handleUploadImage() {
    if(!file) return;

    const xhr = new XMLHttpRequest()
    const formdata = new FormData();

    formdata.append("file", {
      uri: file.uri,
      type: file.type,
      name: file.fileName
    });

    xhr.upload.addEventListener('progress', handleProgress);
    xhr.addEventListener('load', () => {
      setProgress(100);
      setResponseStatus(xhr.status)
    });

    xhr.open('POST', 'https://ipfs-dev.ternoa.dev/api/v0/add');
    xhr.send(formdata);
  }

  return (
    <View style={styles.container}>
      {file &&
        <View style={styles.textContainer}>
          <Text style={styles.textInfo} numberOfLines={1}>{file.fileName}</Text>
          <Text style={styles.textInfo} numberOfLines={1}>{file.uri}</Text>
          <Text style={styles.textInfo} numberOfLines={1}>{(file.fileSize/1000000).toFixed(2)} MB</Text>
        </View>
      }

      <Button name="Select File" onPress={handleSelectFile} testID="select-file"/>
      <Button name="Upload File" onPress={handleUploadImage} testID="upload-file"/>

      {uploading && <ProgressBar progress={progress/100}  width={200} color={Colors.green300} />}

      <Modal 
        showAlert={showAlert} 
        setMessage={setMessage} 
        setResponseStatus={setResponseStatus} 
        setShowAlert={setShowAlert}
        message={message}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%'
  },
  textInfo: {
    color: '#222',
    fontWeight: 'bold'
  },
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